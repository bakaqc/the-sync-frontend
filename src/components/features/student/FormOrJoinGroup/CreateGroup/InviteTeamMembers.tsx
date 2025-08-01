import { AutoComplete, Col, Row, Table, Typography } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { FormLabel } from '@/components/common/FormLabel';
import { useSessionData } from '@/hooks/auth/useAuth';
import { useStudentInviteHandlers } from '@/hooks/student/useStudentInviteHandlers';
import { TEAM_CONFIG, TEAM_STYLES } from '@/lib/constants';
import { showNotification } from '@/lib/utils/notification';
import {
	createNotFoundContent,
	createStudentAutoCompleteOptions,
	createStudentTableColumns,
} from '@/lib/utils/studentInviteHelpers';
import type { Student } from '@/schemas/student';
import { useStudentStore } from '@/store';

interface InviteTeamMembersProps {
	readonly members: Student[];
	readonly onMembersChange: (members: Student[]) => void;
	readonly excludeUserIds?: string[]; // Optional: IDs to exclude from search (e.g., existing group members)
	readonly currentMemberCount?: number; // Optional: Current total members (for invite existing group context)
}

export default function InviteTeamMembers({
	members,
	onMembersChange,
	excludeUserIds = [],
	currentMemberCount,
}: InviteTeamMembersProps) {
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState<Student[]>([]);
	const [isSearching, setIsSearching] = useState(false);

	// Fetch students from store
	const { students, loading, fetchStudentsWithoutGroupAuto } =
		useStudentStore();

	// Get current user session to exclude self from search
	const { session } = useSessionData();
	const currentUserId = session?.user?.id;

	// Fetch students without group on component mount
	useEffect(() => {
		fetchStudentsWithoutGroupAuto();
	}, [fetchStudentsWithoutGroupAuto]);

	// Filter students based on search text
	useEffect(() => {
		if (!searchText.trim()) {
			setSearchResults([]);
			setIsSearching(false);
			return;
		}

		// Set searching state immediately when user types
		setIsSearching(true);

		const timeoutId = setTimeout(() => {
			const searchLower = searchText.toLowerCase();
			const filtered = students.filter((student) => {
				// Exclude current logged-in student
				if (currentUserId && student.id === currentUserId) {
					return false;
				}

				// Exclude users from excludeUserIds list (e.g., existing group members)
				if (excludeUserIds.includes(student.id)) {
					return false;
				}

				const emailMatch = (student.email ?? '')
					.toLowerCase()
					.includes(searchLower);
				const codeMatch = (student.studentCode ?? '')
					.toLowerCase()
					.includes(searchLower);
				const nameMatch = (student.fullName ?? '')
					.toLowerCase()
					.includes(searchLower);

				// Use explicit boolean logic to avoid SonarQube warnings
				if (emailMatch) return true;
				if (codeMatch) return true;
				if (nameMatch) return true;
				return false;
			});

			setSearchResults(filtered);
			setIsSearching(false);
		}, TEAM_CONFIG.SEARCH_DEBOUNCE_MS);

		return () => {
			clearTimeout(timeoutId);
			setIsSearching(false);
		};
	}, [searchText, students, currentUserId, excludeUserIds]);

	// Build options for AutoComplete
	const studentOptions = useMemo(() => {
		return createStudentAutoCompleteOptions(
			searchResults,
			currentUserId,
			members,
			searchText,
			excludeUserIds,
		);
	}, [searchResults, currentUserId, members, searchText, excludeUserIds]);

	const handleAddMember = useCallback(
		(student?: Student) => {
			let targetStudent = student ?? null;

			// Prevent adding current logged-in student
			if (
				targetStudent &&
				currentUserId &&
				targetStudent.id === currentUserId
			) {
				showNotification.warning(
					'Cannot Add Yourself',
					'You cannot add yourself to the group.',
				);
				return;
			}

			// Prevent adding excluded users
			if (targetStudent && excludeUserIds.includes(targetStudent.id)) {
				showNotification.warning(
					'Already a Member',
					'This student is already a group member.',
				);
				return;
			}

			if (!targetStudent) {
				if (!searchText.trim()) {
					return;
				}

				const searchLower = searchText.toLowerCase();
				targetStudent =
					students.find((s) => {
						// Exclude current logged-in student
						if (currentUserId && s.id === currentUserId) {
							return false;
						}

						// Exclude users from excludeUserIds list
						if (excludeUserIds.includes(s.id)) {
							return false;
						}

						const emailMatch = (s.email ?? '').toLowerCase() === searchLower;
						const codeMatch =
							(s.studentCode ?? '').toLowerCase() === searchLower;

						return emailMatch || codeMatch;
					}) ?? null;
			}

			if (!targetStudent) {
				showNotification.error(
					'Student Not Found',
					'Student not found. Please check email or Student Code.',
				);
				return;
			}

			const isAlreadyMember = members.some(
				(member) => member.id === targetStudent.id,
			);
			if (isAlreadyMember) {
				showNotification.warning(
					'Already Added',
					'This student is already in the group.',
				);
				return;
			}

			// Check member limit based on context
			const totalMembersAfterAdd =
				currentMemberCount !== undefined
					? currentMemberCount + members.length + 1 // Existing group: current + selected + new one
					: members.length + 1 + 1; // New group: selected + leader + new one

			if (totalMembersAfterAdd > TEAM_CONFIG.MAX_MEMBERS) {
				const contextMessage =
					currentMemberCount !== undefined
						? `Group would have ${totalMembersAfterAdd} members, exceeding limit of ${TEAM_CONFIG.MAX_MEMBERS}`
						: `Group can have maximum ${TEAM_CONFIG.MAX_MEMBERS} members`;

				showNotification.error('Member Limit Exceeded', contextMessage);
				return;
			}

			const newMember: Student = targetStudent;

			onMembersChange([...members, newMember]);
			showNotification.success(
				'Success',
				`${targetStudent.fullName} added successfully!`,
			);
			setSearchText('');
		},
		[
			searchText,
			members,
			onMembersChange,
			students,
			currentUserId,
			excludeUserIds,
			currentMemberCount,
		],
	);

	// Use shared handlers from custom hook
	const { handleStudentSelect, handleRemoveMember } = useStudentInviteHandlers(
		students,
		members,
		onMembersChange,
		handleAddMember,
	);

	const columns = useMemo(
		() => createStudentTableColumns(handleRemoveMember, 'invite'),
		[handleRemoveMember],
	);

	// Use shared utility for notFoundContent
	const renderNotFoundContent = useMemo(() => {
		return createNotFoundContent(
			searchText,
			loading,
			isSearching,
			searchResults.length,
		);
	}, [searchText, loading, isSearching, searchResults.length]);

	return (
		<div style={{ marginTop: 24 }}>
			<FormLabel text="Invite Team Members" isBold />
			<div style={{ marginTop: 8, marginBottom: 16 }}>
				<Row gutter={[8, 8]} align="middle">
					<Col flex="auto">
						<AutoComplete
							placeholder="Enter student email, Student Code"
							value={searchText}
							options={studentOptions}
							onSearch={setSearchText}
							onSelect={handleStudentSelect}
							notFoundContent={renderNotFoundContent}
							style={{ width: '100%' }}
							filterOption={false}
							allowClear
						/>
					</Col>
				</Row>
			</div>

			<Table
				dataSource={members}
				columns={columns}
				rowKey="id"
				pagination={false}
				size="middle"
				scroll={{ x: true }}
				style={{ marginBottom: 16 }}
				locale={{
					emptyText: 'Search and add students to form your team',
				}}
			/>
			<Typography.Text type="secondary" style={TEAM_STYLES.infoContainer}>
				{currentMemberCount !== undefined ? (
					// Invite to existing group context
					<>
						💡 Current group has {currentMemberCount} members. Select students
						to invite (Selected: {members.length} to invite)
					</>
				) : (
					// Create new group context
					<>
						💡 Each group must have {TEAM_CONFIG.MIN_MEMBERS}-
						{TEAM_CONFIG.MAX_MEMBERS} members (Current: {members.length + 1}{' '}
						members including you)
					</>
				)}
			</Typography.Text>
		</div>
	);
}

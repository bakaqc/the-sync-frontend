import { AutoComplete, Col, Row, Table } from 'antd';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { FormLabel } from '@/components/common/FormLabel';
import { useSessionData } from '@/hooks/auth/useAuth';
import { useStudentInviteHandlers } from '@/hooks/student/useStudentInviteHandlers';
import { TEAM_CONFIG, TEAM_STYLES } from '@/lib/constants';
import { MemberManagementUtils } from '@/lib/utils/memberManagement';
import { showNotification } from '@/lib/utils/notification';
import {
	createNotFoundContent,
	createStudentAutoCompleteOptions,
	createStudentTableColumns,
} from '@/lib/utils/studentInviteHelpers';
import type { Student } from '@/schemas/student';
import { useStudentStore } from '@/store';

interface CreateGroupInviteMembersSimpleProps {
	readonly members: Student[];
	readonly onMembersChange: (members: Student[]) => void;
}

function CreateGroupInviteMembersSimple({
	members,
	onMembersChange,
}: CreateGroupInviteMembersSimpleProps) {
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState<Student[]>([]);
	const [isSearching, setIsSearching] = useState(false);

	// Get store data - simple selectors
	const students = useStudentStore((state) => state.students);
	const loading = useStudentStore((state) => state.loading);
	const fetchStudentsWithoutGroupAuto = useStudentStore(
		(state) => state.fetchStudentsWithoutGroupAuto,
	);

	// Get current user session to exclude self from search
	const { session } = useSessionData();
	const currentUserId = useMemo(() => session?.user?.id, [session?.user?.id]);

	// Fetch students without group on component mount (only once)
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

		// Debounce search to prevent excessive filtering
		const timeoutId = setTimeout(() => {
			const searchLower = searchText.toLowerCase();
			const filtered = students.filter((student) => {
				// Exclude current logged-in student
				if (currentUserId && student.id === currentUserId) {
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

				return emailMatch || codeMatch || nameMatch;
			});

			setSearchResults(filtered);
			setIsSearching(false);
		}, TEAM_CONFIG.SEARCH_DEBOUNCE_MS);

		return () => {
			clearTimeout(timeoutId);
			setIsSearching(false);
		};
	}, [searchText, students, currentUserId]);

	// Build options for AutoComplete
	const studentOptions = useMemo(() => {
		return createStudentAutoCompleteOptions(
			searchResults,
			currentUserId,
			members,
			searchText,
			[], // No excludeUserIds for create-group mode
		);
	}, [searchResults, currentUserId, members, searchText]);

	const handleAddMember = useCallback(
		(targetStudent: Student) => {
			// Use SIMPLE validation for create group only
			const validationResult =
				MemberManagementUtils.validateAddMemberCreateGroup(
					targetStudent,
					members,
					currentUserId,
				);

			if (!validationResult.isValid) {
				if (validationResult.errorMessage) {
					showNotification.warning(validationResult.errorMessage);
				}
				return;
			}

			onMembersChange([...members, targetStudent]);
			showNotification.success(`${targetStudent.fullName} added successfully!`);
			setSearchText('');
		},
		[members, onMembersChange, currentUserId],
	);

	// Use shared handlers from custom hook
	const { handleStudentSelect, handleRemoveMember } = useStudentInviteHandlers(
		students,
		members,
		onMembersChange,
		handleAddMember,
	);

	// Stable columns definition to prevent re-renders
	const columns = useMemo(
		() => createStudentTableColumns(handleRemoveMember, 'create'),
		[handleRemoveMember],
	);

	// Use SIMPLE info text generator for create group
	const renderInfoText = useMemo(() => {
		return MemberManagementUtils.generateInfoTextCreateGroup(members);
	}, [members]);

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
		<div>
			<div style={{ marginBottom: 16 }}>
				<Row gutter={[16, 16]}>
					<Col xs={24}>
						<FormLabel text="Add Team Members (Optional)" isBold />
						<div style={{ marginTop: 8 }}>
							<AutoComplete
								value={searchText}
								options={studentOptions}
								onSearch={setSearchText}
								onSelect={handleStudentSelect}
								placeholder="Search by name, student code, or email..."
								notFoundContent={renderNotFoundContent}
								style={{ width: '100%' }}
								filterOption={false}
								allowClear
							/>
						</div>
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
			<div style={TEAM_STYLES.infoContainer}>{renderInfoText}</div>
		</div>
	);
}

export default memo(CreateGroupInviteMembersSimple);

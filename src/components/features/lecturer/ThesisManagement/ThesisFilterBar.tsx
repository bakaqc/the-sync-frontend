'use client';

import {
	LoadingOutlined,
	PlusOutlined,
	ReloadOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import { Button, Col, Input, Row, Select } from 'antd';
import { useEffect } from 'react';

import { useCurrentSemester } from '@/hooks/semester';
import { useNavigationLoader } from '@/hooks/ux/useNavigationLoader';
import { useSemesterStore } from '@/store';

interface Props {
	search: string;
	onSearchChange: (val: string) => void;
	status?: 'approved' | 'pending' | 'rejected' | 'new';
	onStatusChange: (val?: 'approved' | 'pending' | 'rejected' | 'new') => void;
	owned?: boolean;
	onOwnedChange: (val?: boolean) => void;
	semester?: string;
	onSemesterChange: (val?: string) => void;
	onRefresh: () => void;
}

const statusOptions = [
	{ value: 'new', label: 'New' },
	{ value: 'approved', label: 'Approved' },
	{ value: 'pending', label: 'Pending' },
	{ value: 'rejected', label: 'Rejected' },
];

const ownedOptions = [
	{ value: true, label: 'My Theses' },
	{ value: false, label: 'All Theses' },
];

export default function ThesisFilterBar({
	search,
	onSearchChange,
	status,
	onStatusChange,
	owned,
	onOwnedChange,
	semester,
	onSemesterChange,
	onRefresh,
}: Readonly<Props>) {
	const { isNavigating, targetPath, navigateWithLoading } =
		useNavigationLoader();
	const {
		semesters,
		fetchSemesters,
		loading: semesterLoading,
	} = useSemesterStore();
	const { currentSemester } = useCurrentSemester();

	// Fetch semesters for dropdown options
	useEffect(() => {
		fetchSemesters();
	}, [fetchSemesters]);

	// Set default semester to current semester when component mounts
	useEffect(() => {
		if (currentSemester && !semester) {
			onSemesterChange(currentSemester.id);
		}
	}, [currentSemester, semester, onSemesterChange]);

	const handleCreateThesis = () => {
		navigateWithLoading('/lecturer/thesis-management/create-thesis');
	};

	// Check if this specific button is loading
	const isCreateButtonLoading =
		isNavigating && targetPath === '/lecturer/thesis-management/create-thesis';

	return (
		<Row
			gutter={[12, 12]}
			wrap
			align="middle"
			justify="start"
			style={{ marginBottom: 10 }}
		>
			<Col flex="auto" style={{ minWidth: 200 }}>
				<Input
					allowClear
					prefix={<SearchOutlined />}
					placeholder="Search topics"
					value={search}
					onChange={(e) => onSearchChange(e.target.value)}
				/>
			</Col>

			<Col style={{ width: 140 }}>
				<Select
					allowClear
					placeholder="Filter"
					value={owned}
					options={ownedOptions}
					onChange={onOwnedChange}
					style={{ width: '100%' }}
				/>
			</Col>

			<Col style={{ width: 140 }}>
				<Select
					allowClear
					placeholder="All Semesters"
					value={semester}
					options={semesters.map((s) => ({
						value: s.id,
						label: s.name,
					}))}
					onChange={onSemesterChange}
					loading={semesterLoading}
					style={{ width: '100%' }}
				/>
			</Col>

			<Col style={{ width: 140 }}>
				<Select
					allowClear
					placeholder="All Status"
					value={status}
					options={statusOptions}
					onChange={onStatusChange}
					style={{ width: '100%' }}
				/>
			</Col>

			<Col style={{ width: 120 }}>
				<Button
					icon={<ReloadOutlined />}
					onClick={onRefresh}
					style={{ width: '100%' }}
				>
					Refresh
				</Button>
			</Col>

			<Col style={{ width: 160 }}>
				<Button
					icon={
						isCreateButtonLoading ? <LoadingOutlined spin /> : <PlusOutlined />
					}
					type="primary"
					onClick={handleCreateThesis}
					loading={isCreateButtonLoading}
					disabled={isNavigating && !isCreateButtonLoading}
					style={{ width: '100%' }}
				>
					Create Thesis
				</Button>
			</Col>
		</Row>
	);
}

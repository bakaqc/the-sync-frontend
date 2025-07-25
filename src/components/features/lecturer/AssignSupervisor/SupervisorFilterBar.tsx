'use client';

import { ReloadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Select } from 'antd';
import { memo, useCallback } from 'react';

import GroupSearchBar from '@/components/features/lecturer/AssignSupervisor/GroupSearchBar';

const { Option } = Select;

interface Props {
	search: string;
	onSearchChange: (val: string) => void;
	semester: string;
	onSemesterChange: (val: string) => void;
	onRefresh: () => void;
	refreshing: boolean;
	onAssignAllDrafts: () => void;
	draftCount: number;
	updating: boolean;
	semesterOptions: Array<{ value: string; label: string }>;
}

/**
 * Optimized Filter bar component for supervisor assignment page
 * Uses React.memo and useCallback to prevent unnecessary re-renders
 */
const SupervisorFilterBar = memo<Props>(
	({
		search,
		onSearchChange,
		semester,
		onSemesterChange,
		onRefresh,
		refreshing,
		onAssignAllDrafts,
		draftCount,
		updating,
		semesterOptions,
	}) => {
		const handleSemesterChange = useCallback(
			(value: string) => {
				onSemesterChange(value);
			},
			[onSemesterChange],
		);

		return (
			<Row
				gutter={[12, 12]}
				wrap
				align="middle"
				justify="start"
				style={{ marginBottom: 16 }}
			>
				<Col flex="auto">
					<GroupSearchBar
						value={search}
						onChange={onSearchChange}
						placeholder="Search by abbreviation, thesis name..."
					/>
				</Col>
				<Col style={{ width: 160 }}>
					<Select
						value={semester}
						onChange={handleSemesterChange}
						style={{ width: '100%' }}
						placeholder="Filter by semester"
					>
						{semesterOptions.map((option) => (
							<Option key={option.value} value={option.value}>
								{option.label}
							</Option>
						))}
					</Select>
				</Col>
				<Col>
					<Button
						icon={<ReloadOutlined />}
						loading={refreshing}
						onClick={onRefresh}
						title="Refresh data"
					>
						Refresh
					</Button>
				</Col>
				<Col>
					<Button
						type="primary"
						loading={updating}
						disabled={draftCount === 0}
						onClick={onAssignAllDrafts}
					>
						Assign All Drafts ({draftCount})
					</Button>
				</Col>
			</Row>
		);
	},
);

SupervisorFilterBar.displayName = 'SupervisorFilterBar';

export default SupervisorFilterBar;

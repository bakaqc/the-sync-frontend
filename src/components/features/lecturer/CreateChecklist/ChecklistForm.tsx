'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Row, Space, Switch, Table } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';

import ChecklistCommonHeader from '@/components/features/lecturer/CreateChecklist/ChecklistCommonHeader';
import ChecklistDeleteButton from '@/components/features/lecturer/CreateChecklist/ChecklistDeleteButton';
import ChecklistDragger from '@/components/features/lecturer/CreateChecklist/ChecklistDragger';
import { mockMilestones } from '@/data/milestone';
import { mockSemesters } from '@/data/semester';
import { showNotification } from '@/lib/utils';

type Mode = 'import' | 'manual';

interface UnifiedChecklistFormProps {
	readonly mode: Mode;
}

export default function UnifiedChecklistForm({
	mode,
}: UnifiedChecklistFormProps) {
	const [form] = Form.useForm();
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [checklistName, setChecklistName] = useState('');
	const [checklistDescription, setChecklistDescription] = useState('');
	const [showErrors, setShowErrors] = useState(false);
	const [selectedSemester, setSelectedSemester] = useState<string>('');
	const [selectedMilestone, setSelectedMilestone] = useState<string>('');

	const handleCancel = () => {
		form.resetFields();
		setFileList([]);
		setShowErrors(false);
		showNotification.info('Checklist action cancelled.');
	};

	const handleSaveAll = async () => {
		setShowErrors(true);
		try {
			const values = await form.validateFields();

			if (!selectedSemester || !selectedMilestone) {
				showNotification.warning(
					'Missing Semester or Milestone',
					'Please select both semester and milestone before saving.',
				);
				return;
			}

			if (!checklistName.trim() || !checklistDescription.trim()) {
				showNotification.warning(
					'Missing Checklist Info',
					'Please provide checklist name and description.',
				);
				return;
			}

			if (values.items.length === 0) {
				showNotification.warning(
					'No items added',
					'Please add at least one checklist item before saving.',
				);
				return;
			}

			console.log('Checklist saved with:', {
				semester: selectedSemester,
				milestone: selectedMilestone,
				name: checklistName,
				description: checklistDescription,
				items: values.items,
			});
			showNotification.success('Checklist saved successfully!');
			setShowErrors(false);
		} catch (err) {
			console.error('Checklist validation failed', err);
		}
	};

	return (
		<Space direction="vertical" size="large" style={{ width: '100%' }}>
			<ChecklistCommonHeader
				semester={selectedSemester}
				milestone={selectedMilestone}
				checklistName={checklistName}
				checklistDescription={checklistDescription}
				onNameChange={setChecklistName}
				onDescriptionChange={setChecklistDescription}
				onSemesterChange={setSelectedSemester}
				onMilestoneChange={setSelectedMilestone}
				availableSemesters={mockSemesters}
				availableMilestones={mockMilestones}
				showErrors={showErrors}
			/>

			<Card title="Checklist Items">
				{mode === 'import' && (
					<ChecklistDragger
						fileList={fileList}
						setFileList={setFileList}
						setChecklistItems={(items) =>
							form.setFieldsValue({
								items: items.map((item) => ({
									name: item.name,
									description: item.description,
									isRequired: item.isRequired,
								})),
							})
						}
					/>
				)}

				<Form form={form} name="checklist-form" layout="vertical">
					<Form.List name="items">
						{(fields, { add, remove }) => {
							const hasItems = fields.length > 0;

							return (
								<>
									{(mode === 'manual' || hasItems) && (
										<>
											<Table
												dataSource={fields}
												rowKey={(record) => record.key}
												pagination={false}
												locale={{ emptyText: 'No checklist items added.' }}
												columns={[
													{
														title: 'Item Name',
														dataIndex: 'name',
														key: 'name',
														render: (_, field) => (
															<Form.Item
																name={[field.name, 'name']}
																style={{ marginBottom: 0 }}
																rules={[
																	{ required: true, message: 'Required' },
																]}
																validateStatus={
																	showErrors &&
																	!form.getFieldValue([
																		'items',
																		field.name,
																		'name',
																	])
																		? 'error'
																		: ''
																}
															>
																<Input placeholder="Enter item name" />
															</Form.Item>
														),
													},
													{
														title: 'Description',
														dataIndex: 'description',
														key: 'description',
														render: (_, field) => (
															<Form.Item
																name={[field.name, 'description']}
																style={{ marginBottom: 0 }}
																rules={[
																	{ required: true, message: 'Required' },
																]}
																validateStatus={
																	showErrors &&
																	!form.getFieldValue([
																		'items',
																		field.name,
																		'description',
																	])
																		? 'error'
																		: ''
																}
															>
																<Input placeholder="Enter description" />
															</Form.Item>
														),
													},
													{
														title: 'Required',
														dataIndex: 'isRequired',
														key: 'isRequired',
														align: 'center' as const,
														width: 120,
														render: (_, field) => (
															<Form.Item
																name={[field.name, 'isRequired']}
																style={{ marginBottom: 0 }}
																valuePropName="checked"
															>
																<Switch
																	checkedChildren="Mandatory"
																	unCheckedChildren="Optional"
																/>
															</Form.Item>
														),
													},
													{
														title: 'Action',
														key: 'action',
														width: 80,
														align: 'center' as const,
														render: (_, field) => (
															<div
																style={{
																	display: 'flex',
																	justifyContent: 'center',
																}}
															>
																<Form.Item noStyle>
																	<ChecklistDeleteButton
																		onDelete={() => remove(field.name)}
																	/>
																</Form.Item>
															</div>
														),
													},
												]}
											/>

											<Row
												justify={mode === 'manual' ? 'space-between' : 'end'}
												style={{ marginTop: 16 }}
											>
												{mode === 'manual' && (
													<Button icon={<PlusOutlined />} onClick={() => add()}>
														Add New Item
													</Button>
												)}

												<Space>
													<Button onClick={handleCancel}>Cancel</Button>
													<Button type="primary" onClick={handleSaveAll}>
														{mode === 'manual'
															? 'Save All'
															: 'Import All Checklist'}
													</Button>
												</Space>
											</Row>
										</>
									)}
								</>
							);
						}}
					</Form.List>
				</Form>
			</Card>
		</Space>
	);
}

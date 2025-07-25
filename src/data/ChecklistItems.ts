import { ChecklistItem } from '@/schemas/checklist';

// Sử dụng `as const` để định nghĩa dữ liệu immutable
const checklistItemsData = [
	{
		id: 'i1',
		name: 'Did you submit the proposal document?',
		acceptance: 'NotAvailable',
		description: 'Please upload your thesis proposal in PDF format.',
		isRequired: true,
		checklistId: 'c1',
		createdAt: '2024-06-01',
	},
	{
		id: 'i2',
		name: 'Has your supervisor approved the proposal?',
		acceptance: 'No',
		description: 'Make sure your supervisor has formally approved it.',
		isRequired: true,
		checklistId: 'c1',
		createdAt: '2024-06-02',
	},
	{
		id: 'i3',
		name: 'Did you complete the initial presentation?',
		acceptance: 'Yes',
		description: 'Slides and a video recording are required.',
		isRequired: false,
		checklistId: 'c1',
		createdAt: '2024-06-03',
	},
	{
		id: 'i4',
		name: 'Have you submitted the progress report?',
		acceptance: 'NotAvailable',
		description: 'The report should reflect your current thesis progress.',
		isRequired: true,
		checklistId: 'c2',
		createdAt: '2024-06-03',
	},
	{
		id: 'i5',
		name: 'Did your supervisor provide midterm feedback?',
		acceptance: 'No',
		description: 'You should have written or verbal feedback.',
		isRequired: false,
		checklistId: 'c2',
		createdAt: '2024-06-04',
	},
	// {
	// 	id: 'i6',
	// 	name: 'Have you submitted a complete draft report?',
	// 	acceptance: 'Yes',
	// 	description:
	// 		'The draft should include methodology and preliminary results.',
	// 	isRequired: true,
	// 	checklistId: 'c3',
	// 	createdAt: '2024-06-05',
	// },
	// {
	// 	id: 'i7',
	// 	name: 'Did you summarize all supervisor comments?',
	// 	acceptance: 'NotAvailable',
	// 	description: 'Consolidate all supervisor feedback into a summary.',
	// 	isRequired: false,
	// 	checklistId: 'c3',
	// 	createdAt: '2024-06-06',
	// },
	// {
	// 	id: 'i8',
	// 	name: 'Have you submitted the final thesis?',
	// 	acceptance: 'NotAvailable',
	// 	description:
	// 		'Ensure the final version is supervisor-approved and in PDF format.',
	// 	isRequired: true,
	// 	checklistId: 'c4',
	// 	createdAt: '2024-06-07',
	// },
	// {
	// 	id: 'i9',
	// 	name: 'Did you attach an anti-plagiarism report?',
	// 	acceptance: 'Yes',
	// 	description: 'Submit a Turnitin or iThenticate report.',
	// 	isRequired: true,
	// 	checklistId: 'c4',
	// 	createdAt: '2024-06-08',
	// },
	// {
	// 	id: 'i10',
	// 	name: 'Have you prepared the final presentation slides?',
	// 	acceptance: 'No',
	// 	description: 'Include key findings and recommendations in your slides.',
	// 	isRequired: false,
	// 	checklistId: 'c4',
	// 	createdAt: '2024-06-09',
	// },
	// {
	// 	id: 'i11',
	// 	name: 'Did you submit the proposal document (2023)?',
	// 	acceptance: 'NotAvailable',
	// 	description: 'Upload your thesis proposal in PDF format for 2023 review.',
	// 	isRequired: true,
	// 	checklistId: 'c5',
	// 	createdAt: '2023-06-01',
	// },
	// {
	// 	id: 'i12',
	// 	name: 'Have you been assigned a supervisor?',
	// 	acceptance: 'Yes',
	// 	description: 'Ensure your supervisor is registered in the system.',
	// 	isRequired: false,
	// 	checklistId: 'c5',
	// 	createdAt: '2023-06-02',
	// },
	// {
	// 	id: 'i13',
	// 	name: 'Did you submit the final thesis (2023)?',
	// 	acceptance: 'Yes',
	// 	description: 'Upload the final PDF version approved by your supervisor.',
	// 	isRequired: true,
	// 	checklistId: 'c6',
	// 	createdAt: '2023-06-10',
	// },
	// {
	// 	id: 'i14',
	// 	name: 'Did you attach a Turnitin report?',
	// 	acceptance: 'Yes',
	// 	description: 'Make sure it meets the plagiarism threshold.',
	// 	isRequired: true,
	// 	checklistId: 'c6',
	// 	createdAt: '2023-06-11',
	// },
] as const; // ⚠️ Quan trọng: Đánh dấu dữ liệu là readonly

// Chuyển đổi sang kiểu ChecklistItem với Date object
export const mockChecklistItems: ChecklistItem[] = checklistItemsData.map(
	(item) => ({
		...item,
		createdAt: new Date(item.createdAt),
		updatedAt: new Date('2024-07-01'),
	}),
);

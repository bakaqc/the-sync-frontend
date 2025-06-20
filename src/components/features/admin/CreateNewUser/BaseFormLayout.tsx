'use client';

import { ReactNode, useState } from 'react';

import TabNavigation from '@/components/features/admin/CreateNewUser/TabNavigation';

type Props = {
	pageTitle: string;
	description: string;
	ManualForm: ReactNode;
	ExcelPlaceholder?: ReactNode;
};

const BaseFormLayout = ({
	pageTitle,
	description,
	ManualForm,
	ExcelPlaceholder,
}: Props) => {
	const [activeTab, setActiveTab] = useState('manual');

	return (
		<div className="flex justify-center items-start min-h-screen px-4 py-6">
			<div className="w-full max-w-3xl space-y-6">
				{/* Header */}
				<div className="-ml-8 text-left px-2 sm:px-0">
					<h1 className="text-3xl font-bold">{pageTitle}</h1>
					<p className="text-gray-500 mb-6">{description}</p>

					{/* Tab navigation */}
					<TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
				</div>
				{/* Content based on tab */}
				{activeTab === 'manual' ? (
					<div className="bg-white border border-gray-200 rounded-xl shadow p-4 sm:p-6 md:p-10">
						{ManualForm}
					</div>
				) : (
					<div className="bg-white border border-gray-200 rounded-xl shadow p-4 sm:p-6 md:p-10">
						{ExcelPlaceholder ?? (
							<p className="text-gray-600">
								Excel import functionality coming soon...
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default BaseFormLayout;

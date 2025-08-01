"use client";

import { Alert, Card, Divider, Space, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Header } from "@/components/common/Header";
import ReviewChecklistTable from "@/components/features/lecturer/GroupReview/ReviewChecklistTable";
import ReviewGroupSearchTable, {
	ReviewGroupData,
} from "@/components/features/lecturer/GroupReview/ReviewGroupSearchTable";
import ReviewHeader from "@/components/features/lecturer/GroupReview/ReviewHeader";
import { useReviews } from "@/hooks/lecturer/useReviews";
import { useSupervisions } from "@/hooks/lecturer/useSupervisions";
import milestoneService from "@/lib/services/milestones.service";
import { handleApiResponse } from "@/lib/utils/handleApi";
import { Milestone } from "@/schemas/milestone";

import ReviewersList from "./ReviewersList";

const { Text } = Typography;

export default function GroupReviewPage() {
	const { reviews, loading, error, fetchAssignedReviews } = useReviews();
	const { fetchSupervisors } = useSupervisions();
	const [selectedGroup, setSelectedGroup] = useState<ReviewGroupData>();
	const [searchText, setSearchText] = useState("");
	const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
	const [selectedMilestone, setSelectedMilestone] = useState<string | null>(
		null,
	);
	const [milestoneLoading, setMilestoneLoading] = useState(false);
	const [milestones, setMilestones] = useState<Milestone[]>([]);
	const [supervisorCache, setSupervisorCache] = useState<
		Record<string, string[]>
	>({});

	// Helper function to fetch milestones for a semester
	const fetchMilestonesForSemester = useCallback(async (semesterId: string) => {
		try {
			const response = await milestoneService.findAllBySemester(semesterId);
			const result = handleApiResponse(response);

			if (result.success && result.data) {
				setMilestones(result.data);
			} else {
				setMilestones([]);
			}
		} catch (error) {
			console.error("Error fetching milestones for time check:", error);
			setMilestones([]);
		}
	}, []);

	// Fetch milestones when semester changes
	useEffect(() => {
		if (selectedSemester) {
			fetchMilestonesForSemester(selectedSemester);
		} else {
			setMilestones([]);
		}
	}, [selectedSemester, fetchMilestonesForSemester]);

	// Get selected milestone data for time checking
	const selectedMilestoneData = useMemo(() => {
		if (!selectedMilestone || !milestones.length) return null;
		const milestone = milestones.find((m) => m.id === selectedMilestone);
		if (!milestone) return null;

		// Handle both Date objects and string dates
		const startDate =
			milestone.startDate instanceof Date
				? milestone.startDate.toISOString()
				: milestone.startDate;
		const endDate =
			milestone.endDate instanceof Date
				? milestone.endDate.toISOString()
				: milestone.endDate;

		return {
			startDate,
			endDate,
		};
	}, [selectedMilestone, milestones]);

	// Fetch assigned reviews on component mount
	useEffect(() => {
		fetchAssignedReviews();
	}, [fetchAssignedReviews]);

	// Helper function to fetch supervisors for a single thesis
	const fetchSupervisorsForThesis = useCallback(
		async (thesisId: string) => {
			try {
				const supervisors = await fetchSupervisors(thesisId);
				const supervisorNames = supervisors.map(
					(supervisor) => supervisor.fullName,
				);
				return { thesisId, supervisorNames };
			} catch (error) {
				console.error(`Error fetching supervisors for ${thesisId}:`, error);
				return { thesisId, supervisorNames: [] };
			}
		},
		[fetchSupervisors],
	);

	// Helper function to update supervisor cache
	const updateSupervisorCache = useCallback(
		(results: Array<{ thesisId: string; supervisorNames: string[] }>) => {
			setSupervisorCache((prev) => {
				const newCache = { ...prev };
				results.forEach(({ thesisId, supervisorNames }) => {
					newCache[thesisId] = supervisorNames;
				});
				return newCache;
			});
		},
		[],
	);

	// Fetch supervisors for all theses when reviews change
	useEffect(() => {
		if (reviews.length === 0) return;

		const uniqueThesisIds = Array.from(
			new Set(reviews.map((review) => review.submission.group.thesisId)),
		);

		const uncachedThesisIds = uniqueThesisIds.filter(
			(thesisId) => !supervisorCache[thesisId],
		);

		if (uncachedThesisIds.length === 0) return;

		const fetchAllSupervisors = async () => {
			const supervisorPromises = uncachedThesisIds.map(
				fetchSupervisorsForThesis,
			);
			const results = await Promise.all(supervisorPromises);
			updateSupervisorCache(results);
		};

		fetchAllSupervisors();
	}, [
		reviews,
		supervisorCache,
		fetchSupervisorsForThesis,
		updateSupervisorCache,
	]);

	// Transform API data to component format with supervisor integration
	const groupList = useMemo(() => {
		const keyword = searchText.toLowerCase();

		return reviews
			.map((review) => {
				const thesisId = review.submission.group.thesisId;
				// Get cached supervisor names for this thesis
				const supervisorNames = supervisorCache[thesisId] || [];

				return {
					id: review.submission.group.id,
					code: review.submission.group.code,
					name: review.submission.group.name,
					projectDirection: review.submission.group.projectDirection,
					englishName: review.submission.group.thesis.englishName,
					supervisorNames,
					memberCount:
						review.submission.group.studentGroupParticipations?.length || 0,
					milestonePhase: review.submission.milestone.name,
					milestoneId: review.submission.milestone.id,
					submissionId: review.submission.id,
					thesisId: review.submission.group.thesisId,
					semesterId: review.submission.group.semesterId,
					isMainReviewer: review.isMainReviewer,
					assignmentReviews: review.submission.assignmentReviews,
					createdAt: review.submission.group.createdAt,
					updatedAt: review.submission.group.updatedAt,
				} as ReviewGroupData;
			})
			.filter((group) => {
				// Text search filter
				const matchesSearch =
					group.name.toLowerCase().includes(keyword) ||
					group.englishName.toLowerCase().includes(keyword) ||
					group.projectDirection.toLowerCase().includes(keyword);

				// Semester filter
				const matchesSemester =
					!selectedSemester || group.semesterId === selectedSemester;

				// Milestone filter
				const matchesMilestone =
					!selectedMilestone || group.milestoneId === selectedMilestone;

				return matchesSearch && matchesSemester && matchesMilestone;
			});
	}, [
		reviews,
		searchText,
		selectedSemester,
		selectedMilestone,
		supervisorCache,
	]);

	// Clear selected group when filters change
	useEffect(() => {
		setSelectedGroup(undefined);
	}, [selectedSemester, selectedMilestone]);

	const handleSelect = (group: ReviewGroupData) => {
		setSelectedGroup(group);
	};

	const handleRefresh = () => {
		fetchAssignedReviews();
		setSupervisorCache({}); // Clear supervisor cache to refetch
	};

	const handleSemesterChange = useCallback((semesterId: string | null) => {
		setSelectedSemester(semesterId);
		setSelectedMilestone(null); // Reset milestone when semester changes
	}, []);

	const handleMilestoneChange = useCallback((milestoneId: string | null) => {
		setSelectedMilestone(milestoneId);
	}, []);

	const handleMilestoneLoadingChange = useCallback((loading: boolean) => {
		setMilestoneLoading(loading);
	}, []);

	return (
		<Space direction="vertical" size="large" style={{ width: "100%" }}>
			<Header
				title="Group Review"
				description="This section allows instructors to review each groups progress through
					different phases of their thesis development using a structured
					checklist for evaluation."
			/>

			{error && (
				<Alert
					message="Error loading reviews"
					description={error}
					type="error"
					showIcon
					closable
				/>
			)}

			<ReviewGroupSearchTable
				data={groupList}
				searchText={searchText}
				onSearchChange={setSearchText}
				selectedGroup={selectedGroup}
				onGroupSelect={handleSelect}
				loading={loading || milestoneLoading}
				onRefresh={handleRefresh}
				selectedSemester={selectedSemester}
				onSemesterChange={handleSemesterChange}
				selectedMilestone={selectedMilestone}
				onMilestoneChange={handleMilestoneChange}
				onMilestoneLoadingChange={handleMilestoneLoadingChange}
				showFilters={true}
				selectedMilestoneData={selectedMilestoneData}
			/>

			{selectedGroup && (
				<Card
					title={`Group Name: ${selectedGroup.name} | ${selectedGroup.englishName}`}
				>
					<Space direction="vertical" size="small" style={{ width: "100%" }}>
						<Text type="secondary">
							Supervised by:{" "}
							{selectedGroup.supervisorNames &&
							selectedGroup.supervisorNames.length > 0
								? selectedGroup.supervisorNames.join(", ")
								: "No supervisors assigned"}
						</Text>
					</Space>

					<Divider style={{ margin: "16px 0" }} />

					<Space direction="vertical" size="large" style={{ width: "100%" }}>
						<ReviewHeader />
						<ReviewersList
							assignmentReviews={selectedGroup.assignmentReviews}
						/>
						<ReviewChecklistTable
							submissionId={selectedGroup.submissionId}
							isMainReviewer={selectedGroup.isMainReviewer}
							onSubmitSuccess={() => {
								// Refresh the reviews after successful submission
								fetchAssignedReviews();
								// Optionally close the review panel or show success message
							}}
						/>
					</Space>
				</Card>
			)}
		</Space>
	);
}

import {
	DASHBOARD_PATHS,
	USER_ROLES,
	UserRole,
} from '@/lib/auth/config/auth-constants';
import { canAccessRoute } from '@/lib/auth/guards/permissions';

export interface RouteConfig {
	path: string;
	requiredRole: UserRole;
	requiresModerator?: boolean;
}

export const ROUTE_CONFIGS: RouteConfig[] = [
	{ path: DASHBOARD_PATHS.STUDENT, requiredRole: USER_ROLES.STUDENT },
	{ path: DASHBOARD_PATHS.LECTURER, requiredRole: USER_ROLES.LECTURER },
	{
		path: DASHBOARD_PATHS.LECTURER_GROUP_MANAGEMENT,
		requiredRole: USER_ROLES.LECTURER,
		requiresModerator: true,
	},
	{
		path: DASHBOARD_PATHS.LECTURER_ASSIGN_STUDENT_DETAIL,
		requiredRole: USER_ROLES.LECTURER,
		requiresModerator: true,
	},
	{
		path: DASHBOARD_PATHS.LECTURER_ASSIGN_SUPERVISOR,
		requiredRole: USER_ROLES.LECTURER,
		requiresModerator: true,
	},
	{
		path: DASHBOARD_PATHS.LECTURER_ASSIGN_LIST_PUBLISH_THESIS,
		requiredRole: USER_ROLES.LECTURER,
		requiresModerator: true,
	},
	{
		path: DASHBOARD_PATHS.LECTURER_ASSIGN_LECTURER_REVIEW,
		requiredRole: USER_ROLES.LECTURER,
		requiresModerator: true,
	},
	{
		path: DASHBOARD_PATHS.LECTURER_CHECKLIST_MANAGEMENT,
		requiredRole: USER_ROLES.LECTURER,
		requiresModerator: true,
	},
	{ path: DASHBOARD_PATHS.ADMIN, requiredRole: USER_ROLES.ADMIN },
];

export function findMatchingRoute(pathname: string): RouteConfig | undefined {
	return ROUTE_CONFIGS.find((route) => pathname.startsWith(route.path));
}

export function checkRoutePermission(
	route: RouteConfig,
	userRole?: string,
	isModerator?: boolean,
): { hasAccess: boolean; reason?: string } {
	return canAccessRoute(
		userRole as UserRole,
		isModerator,
		route.requiredRole,
		route.requiresModerator,
	);
}

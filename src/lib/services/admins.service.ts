import httpClient from '@/lib/services/_httpClient';
import { ApiResponse } from '@/schemas/_common';
import { Admin } from '@/schemas/admin';

class AdminService {
	private readonly baseUrl = '/admins';

	async findOne(): Promise<ApiResponse<Admin>> {
		const response = await httpClient.get<ApiResponse<Admin>>(this.baseUrl);
		return response.data;
	}

	async update(updateAdminDto: Partial<Admin>): Promise<ApiResponse<Admin>> {
		const response = await httpClient.put<ApiResponse<Admin>>(
			this.baseUrl,
			updateAdminDto,
		);
		return response.data;
	}
}

const adminService = new AdminService();
export default adminService;

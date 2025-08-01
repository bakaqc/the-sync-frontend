import { FormLabel } from '../common/FormLabel';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';

import LoginFormLayout from '@/components/layout/LoginFormLayout';
import { OtpVerificationSchema } from '@/schemas/forgot-password';

const { Text } = Typography;

/**
 * Props for PasswordResetOtpForm component
 */
interface PasswordResetOtpFormProps {
	/** Callback function when form is submitted */
	readonly onSubmit: (values: { otpCode: string }) => void;
	/** Callback function when resend OTP is requested */
	readonly onResendOtp: () => void;
	/** Callback function when back to email is requested */
	readonly onBackToEmail?: () => void;
	/** Loading state for the verify button */
	readonly loading: boolean;
	/** Loading state for the resend button */
	readonly resendLoading: boolean;
	/** Reset trigger to clear form fields */
	readonly resetTrigger?: number;
}

/**
 * 🔢 Password Reset OTP Form Component
 * Styled consistently with login forms
 *
 * @description Form component for OTP verification during password reset flow
 * @version 1.0.0
 */
export const PasswordResetOtpForm = ({
	onSubmit,
	onResendOtp,
	onBackToEmail,
	loading,
	resendLoading,
	resetTrigger = 0,
}: PasswordResetOtpFormProps) => {
	const [form] = Form.useForm();
	const [isFormValid, setIsFormValid] = useState(false);

	// Reset form when resetTrigger changes
	useEffect(() => {
		if (resetTrigger > 0) {
			form.resetFields(['otpCode']);
			setIsFormValid(false);
		}
	}, [resetTrigger, form]);

	// Use consistent validation rules with shared utility
	const otpRules = [
		{
			validator: async (_: unknown, value: string) => {
				if (!value) {
					return Promise.reject(new Error('OTP is required'));
				}
				try {
					OtpVerificationSchema.parse({ otpCode: value });
					return Promise.resolve();
				} catch (error: unknown) {
					const zodError = error as { errors?: Array<{ message: string }> };
					return Promise.reject(
						new Error(zodError.errors?.[0]?.message || 'Invalid OTP'),
					);
				}
			},
		},
	];

	// Handle OTP input change - simplified validation based on schema requirements
	const handleOtpChange = (value: string) => {
		// Remove non-digit characters and limit to 8 digits
		const numericValue = value.replace(/\D/g, '').slice(0, 8);

		// Update the form field with the sanitized value
		form.setFieldValue('otpCode', numericValue);

		// Validate using schema
		setIsFormValid(
			OtpVerificationSchema.shape.otpCode.safeParse(numericValue).success,
		);
	};

	// Handle form field changes
	const handleFieldsChange = () => {
		const otpCode = form.getFieldValue('otpCode') || '';
		// Schema-based validation
		setIsFormValid(
			OtpVerificationSchema.shape.otpCode.safeParse(otpCode).success,
		);
	};

	return (
		<LoginFormLayout title="Enter verification code">
			<Form
				form={form}
				name="password-reset-otp"
				onFinish={onSubmit}
				layout="vertical"
				size="large"
				requiredMark={false}
				onFieldsChange={handleFieldsChange}
				autoComplete="off"
			>
				<Form.Item
					name="otpCode"
					label={<FormLabel text="Enter OTP" isRequired />}
					rules={otpRules}
				>
					<Input
						placeholder="Enter 8-digit OTP"
						maxLength={8}
						onChange={(e) => handleOtpChange(e.target.value)}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						loading={loading}
						disabled={!isFormValid || loading}
						block
						size="large"
						style={{
							marginTop: '8px',
						}}
					>
						{loading ? 'Verifying...' : 'Verify OTP'}
					</Button>
				</Form.Item>

				<div style={{ textAlign: 'center', marginTop: '1rem' }}>
					<Text style={{ color: '#6b7280' }}>
						Didn&apos;t receive the code?{' '}
					</Text>
					<Button
						type="link"
						onClick={onResendOtp}
						loading={resendLoading}
						style={{ padding: 0, height: 'auto', fontSize: '14px' }}
					>
						{resendLoading ? 'Sending...' : 'Resend OTP'}
					</Button>
				</div>

				{onBackToEmail && (
					<div style={{ textAlign: 'center', marginTop: '16px' }}>
						<Button
							type="link"
							icon={<ArrowLeftOutlined />}
							onClick={onBackToEmail}
							style={{ fontSize: '14px' }}
						>
							Back to Email
						</Button>
					</div>
				)}
			</Form>
		</LoginFormLayout>
	);
};

// Legacy export for backward compatibility (temporary)
export const OtpForm = PasswordResetOtpForm;

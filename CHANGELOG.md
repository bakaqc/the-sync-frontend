# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

For more information about this project, see the [README](./README.md).

---

## [0.5.0] - 2025-07-16

### Added

- Student Dashboard page and improved student group/thesis management ([#166](https://github.com/5-logic/the-sync-frontend/pull/166), [#172](https://github.com/5-logic/the-sync-frontend/pull/172), [#179](https://github.com/5-logic/the-sync-frontend/pull/179), [#204](https://github.com/5-logic/the-sync-frontend/pull/204), [#211](https://github.com/5-logic/the-sync-frontend/pull/211))
- UI for student to view and register thesis, including AI-suggested topics ([#221](https://github.com/5-logic/the-sync-frontend/pull/221), [#230](https://github.com/5-logic/the-sync-frontend/pull/230), [#234](https://github.com/5-logic/the-sync-frontend/pull/234))
- Group assignment and invitation features for students ([#166](https://github.com/5-logic/the-sync-frontend/pull/166), [#179](https://github.com/5-logic/the-sync-frontend/pull/179))
- Breadcrumb navigation and improved layout for all roles ([#205](https://github.com/5-logic/the-sync-frontend/pull/205))
- Admin account settings modal and admin data management ([#231](https://github.com/5-logic/the-sync-frontend/pull/231))
- Password reset and OTP verification flows ([#181](https://github.com/5-logic/the-sync-frontend/pull/181), [#201](https://github.com/5-logic/the-sync-frontend/pull/201))
- Track progress UI for students and groups ([#205](https://github.com/5-logic/the-sync-frontend/pull/205))
- Enhanced group dashboard with thesis, supervisor, and progress cards ([#230](https://github.com/5-logic/the-sync-frontend/pull/230))

### Changed

- Refactored and improved layout for thesis, group, and student components
- Enhanced caching and force refresh for students, lecturers, milestones, and groups
- Improved error handling and notification for password reset and OTP flows
- Updated breadcrumb and sidebar navigation for all roles
- Improved performance and UI consistency across pages

### Fixed

- Fixed SonarCloud issues and code quality improvements
- Fixed UI bugs in student, group, and thesis pages
- Fixed build and import issues for new components
- Fixed password validation and OTP input handling

### Technical Details

- Major refactor of student/group/thesis hooks and stores
- Added new Zod schemas for password reset and OTP
- Improved modularization of services and hooks
- Enhanced test cases and removed debug logs

### Migration Notes

- No breaking API changes, but new features require updated UI and store logic
- Users should refresh browser cache for new UI and navigation

---

## [0.4.0] - 2025-07-10

### Added

#### Group Management System

- Complete group dashboard with comprehensive member management ([#158](https://github.com/5-logic/the-sync-frontend/pull/158), [#161](https://github.com/5-logic/the-sync-frontend/pull/161), [#169](https://github.com/5-logic/the-sync-frontend/pull/169))
- Group creation with skill requirements and member invitation system
- Advanced group member management with leader assignment and removal capabilities
- Group requests management with invitation and join request handling
- Group status guards and navigation protection
- Enhanced group browsing and discovery features
- Group confirmation modals for sensitive operations

#### Student Features Enhancement

- Student account management with skills and responsibilities ([#146](https://github.com/5-logic/the-sync-frontend/pull/146), [#183](https://github.com/5-logic/the-sync-frontend/pull/183), [#189](https://github.com/5-logic/the-sync-frontend/pull/189))
- Enhanced student profile with skill level tracking and phone number validation
- Student group dashboard with detailed group information
- Improved form validation and user experience
- Student thesis detail viewing capabilities

#### Lecturer Tools & Management

- Comprehensive checklist management system ([#150](https://github.com/5-logic/the-sync-frontend/pull/150), [#154](https://github.com/5-logic/the-sync-frontend/pull/154))
- Checklist creation with manual and Excel import options
- Checklist editing and detailed view functionality
- Lecturer assignment and review workflows ([#140](https://github.com/5-logic/the-sync-frontend/pull/140), [#144](https://github.com/5-logic/the-sync-frontend/pull/144))
- Enhanced thesis publishing management with bulk operations
- Group review and evaluation capabilities
- Improved lecturer profile settings and account management

#### Request Management System

- Centralized request management with status tracking ([#164](https://github.com/5-logic/the-sync-frontend/pull/164), [#170](https://github.com/5-logic/the-sync-frontend/pull/170))
- Request status management with cancellation capabilities
- Enhanced invite and join request workflows
- Request filtering and search functionality
- Real-time request status updates and notifications

#### UI/UX Improvements

- Enhanced navigation with role-based sidebar improvements ([#148](https://github.com/5-logic/the-sync-frontend/pull/148))
- Common download template components for Excel operations
- Improved form validation and error handling across all features
- Enhanced responsive design and mobile compatibility
- Better loading states and user feedback systems

### Changed

#### API Schema Enhancements

- **Group Schema:** Added comprehensive `GroupDashboardSchema` with member, skill, and responsibility relationships
- **Student Schema:** Enhanced with profile management and skill tracking capabilities
- **Responsibility Schema:** Improved validation and API response handling
- **Request Management:** Enhanced request status handling with 'Cancelled' status support

#### Service Layer Improvements

- **GroupService:** Added member management, leader assignment, and group operations
- **RequestService:** Enhanced with cancellation and status management capabilities
- **ResponsibilityService:** Converted to static class with improved method definitions
- **PasswordService:** New centralized password management service
- **StudentsService:** Enhanced with group-related filtering and profile management

#### Performance & Architecture

- Enhanced store management with specialized stores for groups, requests, and responsibilities
- Improved caching strategies for group and request data
- Better state management with context providers for group status
- Optimized data fetching patterns with background refresh capabilities
- Enhanced error handling and notification systems

#### Authentication & Security

- Enhanced password management with unified service layer
- Improved phone number validation for Vietnamese format
- Better session handling and user profile management
- Enhanced role-based access controls

### Fixed

- Form validation edge cases in group creation and member management
- Request management synchronization issues
- Navigation state persistence in group workflows
- Mobile responsiveness issues in group and checklist interfaces
- Memory leaks in request polling and status updates
- Excel import validation for checklist and member data
- Search and filtering performance optimizations

### API Breaking Changes

- **Group Dashboard:** New API structure with detailed member and relationship data
- **Request Management:** Enhanced request status with 'Cancelled' option
- **Student Profile:** Changed API structure for profile updates and skill management
- **Password Management:** Centralized password change endpoints

### Technical Details

- **New Services:** `GroupService`, `RequestService`, `ResponsibilityService`, `PasswordService`
- **Enhanced Stores:** Group dashboard store, requests store, responsibility store
- **Context Providers:** Group status context for navigation and state management
- **Utility Functions:** Text normalization, member management helpers, student invite utilities
- **Schema Validation:** Enhanced group, student, and responsibility schemas
- **Excel Templates:** New templates for checklist creation

### Migration Notes

- Group-related API calls now return enhanced data structures with member details
- Request management requires handling of new 'Cancelled' status
- Student profile updates should use new unified profile API
- Password management operations should use centralized PasswordService
- Excel import templates have been updated with new field requirements

---

## [0.3.0] - 2025-07-02

### Added

#### Storage & File Management

- Complete Supabase Storage integration for file uploads ([#103](https://github.com/5-logic/the-sync-frontend/pull/103), [#117](https://github.com/5-logic/the-sync-frontend/pull/117))
- `StorageService` with file upload, download, and deletion capabilities
- File sanitization and unique naming for storage compatibility
- Secure file URLs with expiration support
- Support for thesis supporting documents and attachments

#### Authentication & Security Enhancements

- Enhanced authentication system with modular architecture ([#102](https://github.com/5-logic/the-sync-frontend/pull/102), [#115](https://github.com/5-logic/the-sync-frontend/pull/115))
- Advanced TokenManager with remember me functionality and storage strategy
- Throttled token refresh mechanism to prevent excessive API calls
- Smart storage management (localStorage vs sessionStorage)
- Enhanced session callbacks with proper typing and remember me support
- Account validation and status checking during authentication
- Token expiration aligned with backend settings (1h access, 7d refresh)

#### Thesis Management System

- Comprehensive thesis CRUD operations with enhanced API schema ([#120](https://github.com/5-logic/the-sync-frontend/pull/120), [#122](https://github.com/5-logic/the-sync-frontend/pull/122), [#124](https://github.com/5-logic/the-sync-frontend/pull/124))
- Thesis creation with skill requirements and file uploads
- Thesis version control and history tracking
- Enhanced thesis filtering and status management
- Thesis assignment and supervision features
- Group assignment and supervision workflows
- Milestone integration with thesis progress tracking

#### Student & Group Management

- Student account management with semester-based filtering ([#125](https://github.com/5-logic/the-sync-frontend/pull/125), [#126](https://github.com/5-logic/the-sync-frontend/pull/126))
- Group creation and joining functionality
- Enhanced student dashboard with first-login experience
- Group progress tracking and milestone management
- Student profile settings and account management

#### Lecturer Features

- Lecturer dashboard with comprehensive management tools ([#128](https://github.com/5-logic/the-sync-frontend/pull/128), [#130](https://github.com/5-logic/the-sync-frontend/pull/130))
- Thesis assignment to students and groups
- Supervisor assignment workflows
- Group progress monitoring and milestone tracking
- Enhanced lecturer profile management
- Timeline review and approval system

#### UI/UX Improvements

- Enhanced navigation with role-based sidebar configurations ([#133](https://github.com/5-logic/the-sync-frontend/pull/133), [#136](https://github.com/5-logic/the-sync-frontend/pull/136))
- Improved authentication flow with loading states
- Enhanced form components with better validation
- Responsive design improvements across all pages
- Optimized pagination and table components
- Enhanced modal and dialog components

### Changed

#### API Schema & Endpoints

- **Thesis Schema Enhancement:** Added `ThesisWithRelationsSchema` for API responses with relationships
- **Thesis Create Schema:** Simplified with `skillIds` array and `supportingDocument` field
- **Thesis Update Schema:** Enhanced with skill management and file update support
- **Authentication Schemas:** Enhanced validation patterns and error handling

#### Package Dependencies

- **Added:** `@supabase/supabase-js@2.50.2` for storage and database integration
- **Removed:** `quill@2.0.3` and `react-quill@2.0.0` - replaced with simpler text editing solutions

#### Performance & Architecture

- Migrated to modular authentication architecture
- Enhanced HTTP client timeout configuration (extended to 1 hour)
- Improved caching strategies with TTL and invalidation
- Optimized token management with smart storage selection
- Enhanced error handling and user feedback systems

#### Security Improvements

- Token storage strategy based on remember me preference
- Enhanced session management with proper expiration
- Improved CSRF protection and request validation
- Better error handling without exposing sensitive information

### Fixed

- Authentication flow edge cases and token refresh issues
- File upload validation and error handling
- Form validation and submission edge cases
- Navigation state persistence across page reloads
- Responsive design issues on mobile devices
- Memory leaks in token refresh mechanisms
- CORS and API communication improvements

### API Breaking Changes

- **Thesis Creation:** Now requires `supportingDocument` field and accepts `skillIds` array
- **File Upload:** Migrated from custom backend storage to Supabase Storage
- **Authentication:** Enhanced token structure with remember me metadata
- **Storage URLs:** Changed from backend-generated to Supabase public URLs

### Technical Details

- **Storage Integration:** Complete Supabase Storage setup with bucket management
- **Enhanced Services:** New `StorageService` for file operations
- **Authentication Refactor:** Modular auth services (`AdminAuthService`, `UserAuthService`, `BaseAuthService`)
- **Token Management:** Advanced `TokenManager` with conditional storage and throttling
- **HTTP Client:** Enhanced timeout and interceptor configuration
- **Error Handling:** Centralized `AuthErrorHandler` for consistent error processing

### Migration Notes

- Files previously stored on backend should be migrated to Supabase Storage
- Authentication tokens will be automatically migrated to new storage strategy
- Rich text editing features using Quill have been simplified to basic text input
- Update environment variables to include Supabase configuration

---

## [0.2.0] - 2025-06-25

### Added

#### Student Management Enhancements

- Complete student management system with CRUD operations ([#84](https://github.com/5-logic/the-sync-frontend/pull/84), [#96](https://github.com/5-logic/the-sync-frontend/pull/96))
- Excel import functionality for bulk student creation ([#97](https://github.com/5-logic/the-sync-frontend/pull/97), [#98](https://github.com/5-logic/the-sync-frontend/pull/98))
- Student status toggle with confirmation modals
- Semester-based student filtering and management
- Student status toggle API endpoint

#### Lecturer Management System

- Complete lecturer management interface with CRUD operations ([#84](https://github.com/5-logic/the-sync-frontend/pull/84))
- Moderator role toggle functionality for lecturers
- Lecturer status management with confirmation dialogs
- Excel import support for bulk lecturer creation
- Enhanced lecturer filtering and search capabilities

#### Data Management & API Improvements

- **New API Endpoints:**
  - `POST /students/import` - Bulk student creation from Excel import
  - `POST /students/{id}/toggle-status` - Toggle student active status
  - `POST /lecturers/{id}/toggle-status` - Toggle lecturer active status
  - `POST /lecturers/{id}/toggle-moderator` - Toggle lecturer moderator role
  - `DELETE /milestones/{id}` - Delete milestone functionality
- Enhanced HTTP client timeout from 10s to 10 minutes for large operations
- Improved error handling and API response utilities

#### Store & State Management

- Complete Zustand stores for all major entities (students, lecturers, majors, semesters, milestones)
- Centralized caching utilities with TTL support ([#85](https://github.com/5-logic/the-sync-frontend/pull/85))
- Generic toggle operations for status management
- Background refresh handling for real-time data updates
- Enhanced store actions with batch operations

#### UI/UX Improvements

- Centralized TablePagination component for consistent pagination ([#91](https://github.com/5-logic/the-sync-frontend/pull/91), [#92](https://github.com/5-logic/the-sync-frontend/pull/92))
- Enhanced milestone management interface ([#83](https://github.com/5-logic/the-sync-frontend/pull/83), [#87](https://github.com/5-logic/the-sync-frontend/pull/87), [#89](https://github.com/5-logic/the-sync-frontend/pull/89))
- Milestone deletion with confirmation dialogs
- Improved timeline review components with project milestones ([#70](https://github.com/5-logic/the-sync-frontend/pull/70), [#80](https://github.com/5-logic/the-sync-frontend/pull/80), [#81](https://github.com/5-logic/the-sync-frontend/pull/81))
- Enhanced thesis management and detail views ([#68](https://github.com/5-logic/the-sync-frontend/pull/68), [#69](https://github.com/5-logic/the-sync-frontend/pull/69), [#71](https://github.com/5-logic/the-sync-frontend/pull/71), [#74](https://github.com/5-logic/the-sync-frontend/pull/74), [#75](https://github.com/5-logic/the-sync-frontend/pull/75))
- Semester status tags and improved semester management
- Excel template files for student and lecturer imports

### Changed

#### API Schema Updates

- **Student Schema:** Added `ImportStudentSchema` and `ImportStudentItemSchema` for batch operations
- **Student API:** Updated `StudentCreateSchema` to include required `semesterId` field
- **Lecturer Schema:** Enhanced with `LecturerToggleStatus` schema for status management
- **Toggle Operations:** Standardized toggle APIs to use POST requests instead of PATCH

#### Data Flow Improvements

- Migrated from local state to global Zustand stores across all management components
- Enhanced form validation with field-specific error handling
- Improved data fetching patterns with caching and background refresh
- Streamlined semester-based filtering across student and lecturer management

#### Performance Optimizations

- Lazy loading implementation for management components
- Optimized re-renders with proper state management
- Enhanced table performance with virtualization support
- Background data refresh without blocking UI

### Fixed

- Code quality improvements and SonarCloud issue resolution ([#101](https://github.com/5-logic/the-sync-frontend/pull/101))
- Enhanced error handling in Excel import validation
- Fixed form validation edge cases in milestone management
- Improved disabled state logic for milestone edit/delete operations
- Corrected semester selection and filtering logic
- Fixed whitespace and formatting issues across components
- Enhanced notification messaging consistency

### API Breaking Changes

- **Student Creation:** Now requires `semesterId` parameter in create operations
- **Toggle Operations:** Status toggle endpoints changed from PATCH to POST
- **Bulk Operations:** New import endpoints require specific schema format:
  ```typescript
  // Student Import
  POST /students/import
  {
    semesterId: string,
    majorId: string,
    students: Array<{
      studentId: string,
      email: string,
      fullName: string,
      password: string,
      gender: string,
      phoneNumber: string
    }>
  }
  ```

### Technical Details

- **New Services:** `LecturerService`, `StudentService` with full CRUD operations
- **Enhanced Stores:** Complete state management with caching and optimistic updates
- **Validation:** Enhanced Zod schemas with import-specific validation
- **File Handling:** Excel template generation and processing utilities
- **Error Handling:** Centralized API error handling with user-friendly messages

---

## [0.1.0] - 2025-06-18

This is the first release of TheSync Frontend - a modern web application built with Next.js, Ant Design, and Tailwind CSS.

### Added

#### Authentication & Authorization

- Complete authentication system with NextAuth and JWT ([#9](https://github.com/5-logic/the-sync-frontend/pull/9), [#10](https://github.com/5-logic/the-sync-frontend/pull/10), [#11](https://github.com/5-logic/the-sync-frontend/pull/11))
- Role-based access control with admin, lecturer, and student roles
- Permission-based navigation and page protection
- Login page with support for both email and username authentication
- Token validation and session management with TTL caching

#### User Interface & Layout

- Responsive collapsible sidebar layout ([#12](https://github.com/5-logic/the-sync-frontend/pull/12), [#13](https://github.com/5-logic/the-sync-frontend/pull/13))
- Role-based navigation sidebars for admin, lecturer, and student
- Modern header components with user profile integration
- Footer component with responsive design
- Enhanced navigation loading with smart detection
- Chatbot widget integration for user support ([#46](https://github.com/5-logic/the-sync-frontend/pull/46), [#48](https://github.com/5-logic/the-sync-frontend/pull/48))

#### Admin Management Features

- Student management interface ([#19](https://github.com/5-logic/the-sync-frontend/pull/19), [#20](https://github.com/5-logic/the-sync-frontend/pull/20))
  - Create, read, update, delete student accounts
  - Import students from Excel files
  - Student filtering and search functionality
- Lecturer management system ([#35](https://github.com/5-logic/the-sync-frontend/pull/35))
  - Complete CRUD operations for lecturer accounts
  - Lecturer profile management
- Semester settings management ([#44](https://github.com/5-logic/the-sync-frontend/pull/44), [#45](https://github.com/5-logic/the-sync-frontend/pull/45))
  - Semester creation and editing
  - Semester table with search and filter capabilities
- Milestone management ([#50](https://github.com/5-logic/the-sync-frontend/pull/50))
  - Create and manage project milestones
  - Date validation and overlap checking
  - Milestone table with edit functionality

#### Thesis Management

- Comprehensive thesis creation and editing interface ([#39](https://github.com/5-logic/the-sync-frontend/pull/39))
- Thesis detail view with metadata and progress tracking
- File upload functionality for supporting documents
- Thesis duplicate detection and management
- Review system with timeline tracking
- Status management and action buttons

#### Data Management & Services

- Complete API integration with HTTP client service ([#23](https://github.com/5-logic/the-sync-frontend/pull/23))
- Comprehensive data schemas with Zod validation ([#23](https://github.com/5-logic/the-sync-frontend/pull/23))
- Service layer for all major entities (students, lecturers, semesters, milestones)
- Global state management with Zustand stores
- API response handling utilities with error management

#### Development Experience

- TypeScript configuration with strict type checking
- ESLint and Prettier integration with commit hooks
- Husky for git hooks and commit message validation
- GitHub Actions for CI/CD (build, lint, test workflows)
- Commitlint for conventional commit messages
- Automated release workflow with semantic versioning

#### UI Components & Styling

- Integration with Ant Design component library
- Tailwind CSS for utility-first styling
- Custom component library with form components
- Responsive design patterns
- Loading states and error handling components
- Notification system for user feedback

### Changed

- Migrated from class components to functional components with hooks
- Improved form validation with enhanced error messages
- Enhanced authentication loading logic and state management
- Optimized navigation performance with smart caching
- Refactored layout components for better reusability

### Fixed

- Sonar Cloud security issues and code quality improvements ([#62](https://github.com/5-logic/the-sync-frontend/pull/62))
- Build configuration and dependency issues
- Import path corrections throughout the application
- Form validation edge cases
- Navigation state persistence
- Performance optimizations for large data sets

### Technical Details

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + Ant Design
- **Authentication**: NextAuth.js with JWT
- **State Management**: Zustand
- **Validation**: Zod schemas
- **HTTP Client**: Axios with interceptors
- **Development**: TypeScript, ESLint, Prettier
- **CI/CD**: GitHub Actions

---

## [Unreleased]

Changes that are committed but not yet released.

---

**Links:**

- [GitHub Repository](https://github.com/5-logic/the-sync-frontend)
- [Documentation](./README.md)
- [Project Structure](./docs/PROJECT_STRUCTURE.md)

**Tags:**

- [0.4.0](https://github.com/5-logic/the-sync-frontend/releases/tag/0.4.0)
- [0.3.0](https://github.com/5-logic/the-sync-frontend/releases/tag/0.3.0)
- [0.2.0](https://github.com/5-logic/the-sync-frontend/releases/tag/0.2.0)
- [0.1.0](https://github.com/5-logic/the-sync-frontend/releases/tag/0.1.0)


# LioKids - Preschool/Kindergarten Management App

## Project Overview
LioKids is a React Native mobile application for preschool and kindergarten management. It serves multiple user roles: Parents, Teachers, School Administrators, and Personnel/Staff.

**Primary Language:** Turkish
**Platform:** Mobile only (React Native)
**Target:** iOS & Android

---

## Architecture & Tech Stack

### Core Technologies
- **Framework:** React Native
- **Language:** JavaScript/TypeScript
- **Navigation:** React Navigation (Stack + Bottom Tabs)
- **State Management:** Context API / Zustand (prefer lightweight solutions)
- **API Communication:** RemotingService pattern (centralized service layer)
- **Storage:** AsyncStorage (non-sensitive), Keychain/Keystore (tokens/credentials)

### Project Structure (Domain-Driven)
```
src/
├── components/          # Reusable UI components
│   ├── atoms/           # Buttons, inputs, icons, badges, avatars
│   ├── molecules/       # Cards, list items, form fields, status indicators
│   └── organisms/       # Headers, navigation, modals, bottom sheets
├── screens/             # Screen components grouped by domain
│   ├── auth/            # Login, register, forgot password
│   ├── home/            # Dashboard, notifications
│   ├── students/        # Ogrenciler - student profiles, CRUD
│   ├── classes/         # Siniflar - class management
│   ├── attendance/      # Yoklama - daily attendance tracking
│   ├── development/     # Fiziksel Gelisim - height, weight, BMI
│   ├── medical/         # Medikal Takip - health records, allergies
│   ├── gallery/         # Galeri - photos, albums
│   ├── documents/       # Dokumanlar - enrollment forms, reports
│   ├── fees/            # Aidatlar - payments, installments
│   ├── messages/        # Bildirimler - notifications, messaging
│   ├── personnel/       # Personel - staff management
│   ├── parents/         # Veliler - parent management
│   └── profile/         # Profil - user settings
├── navigation/          # Navigation configuration
│   ├── AppNavigator.js
│   ├── AuthNavigator.js
│   ├── ParentTabNavigator.js
│   ├── TeacherTabNavigator.js
│   └── AdminTabNavigator.js
├── services/            # API and business logic services
│   └── RemotingService.js  # Centralized API communication
├── hooks/               # Custom React hooks
├── context/             # React Context providers
├── utils/               # Utility functions
├── constants/           # App constants, theme, config
│   └── images.js        # IMAGES constant for all icons/images
├── types/               # TypeScript type definitions
└── assets/              # Static assets (fonts, images)
```

---

## Coding Conventions

### Component Patterns
- **Functional components only** - no class components
- **StyleSheet.create** for all styling - no inline styles
- **Custom hooks** for reusable business logic extraction
- **React.memo** for components receiving stable props in lists
- **useMemo/useCallback** where re-render prevention is measurable

### Naming Conventions
- **Files:** PascalCase for components (`StudentCard.js`), camelCase for utils (`formatDate.js`)
- **Components:** PascalCase (`StudentListScreen`)
- **Hooks:** camelCase with `use` prefix (`useStudentData`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Screens:** Suffix with `Screen` (`AttendanceScreen`)
- **Services:** Suffix with `Service` (`RemotingService`)

### Import Rules
- Use `IMAGES` constant for all icons/images - **never** use `react-native-vector-icons` directly
- Prefer project-specific utilities over external libraries when available
- Group imports: React > React Native > Third-party > Local

### API Communication
- All API calls go through `RemotingService` pattern
- Never call fetch/axios directly from components
- Handle loading, error, and success states for every API call

---

## User Roles & Navigation

### Parent (Veli)
- Bottom Tabs: Home | My Child | Payments | Messages | Profile
- Read-heavy experience, focused on child info and communication

### Teacher (Ogretmen)
- Bottom Tabs: Home | My Class | Attendance | Gallery | Profile
- Daily operations: attendance, activities, development tracking

### School Admin (Yonetici)
- Bottom Tabs: Home | Students | Classes | Fees | More
- Full management capabilities across all entities

### Personnel (Personel)
- Limited operational views based on assigned permissions

---

## Core Domain Entities

| Entity | Turkish | Key Fields |
|--------|---------|------------|
| Student | Ogrenci | Profile, photo, class assignment, parent relationships |
| Parent | Veli | Children (multiple), payments, communication |
| Class | Sinif | Students, teacher, capacity |
| Personnel | Personel | Role, contact, assignments |
| Fee | Aidat | Amount, due date, status (Odendi/Bekliyor/Gecikti) |
| Physical Dev | Fiziksel Gelisim | Height, weight, BMI, growth charts |
| Medical | Medikal Takip | Health info, allergies, vaccinations |
| Gallery | Galeri | Activity photos, event albums |
| Document | Dokuman | Enrollment forms, reports, official docs |
| Attendance | Yoklama | Daily tracking, absence reasons |

---

## UX Requirements

### Mandatory States (Every Screen)
- **Loading:** Skeleton screens for lists, spinner for actions
- **Empty:** Friendly illustration + action prompt
- **Error:** Network failure, permission denied, session expired
- **Pull-to-refresh** on all list screens

### Mobile-First Rules
- Minimum touch target: 44x44pt
- 8pt spacing grid system
- One primary action per screen
- Bottom sheets for secondary actions
- No desktop patterns (data tables, sidebars, multi-column)

### Design Tokens
```
Spacing: 4, 8, 12, 16, 24, 32, 48
Border Radius: 4 (small), 8 (medium), 16 (large), 24 (card)
```

---

## Security Guidelines

### Token & Credential Storage
- **MUST** use Keychain (iOS) / Keystore (Android) for tokens
- **NEVER** store tokens in AsyncStorage
- **NEVER** hardcode API keys, secrets, or credentials in source code

### API Security
- HTTPS only
- Certificate pinning for production
- Request signing where applicable
- Validate all user inputs before sending to API

### Data Protection
- No sensitive data in console.log or crash reports
- Proper permission handling for camera, gallery, notifications
- Role-based access control enforced on both client and server

---

## Performance Guidelines

### Lists & Virtualization
- Use `FlatList` with proper `keyExtractor`, `getItemLayout` when possible
- Set `removeClippedSubviews`, `maxToRenderPerBatch`, `windowSize` for long lists
- Avoid inline functions in `renderItem`

### Re-render Prevention
- `React.memo` for list item components
- `useCallback` for event handlers passed as props
- `useMemo` for expensive computations
- Avoid creating new objects/arrays in render

### Images
- Use cached image loading (e.g., FastImage)
- Resize/compress before upload
- Lazy load images in lists
- Placeholder/skeleton while loading

### Animations
- Prefer `useNativeDriver: true`
- Avoid layout thrashing during animations
- Use `LayoutAnimation` for simple transitions

---

## Testing Strategy
- Unit tests for utilities and hooks
- Component tests for critical UI flows
- Integration tests for API service layer
- E2E tests for critical user journeys (login, attendance, payment)

---

## Git Conventions
- Branch naming: `feature/`, `bugfix/`, `hotfix/` prefixes
- Commit messages: Clear, imperative mood, Turkish or English
- PR reviews using `rn-code-reviewer` agent before merge

---

## Common Patterns

### Student Card Component
```
Photo thumbnail + Name + Class + Status indicators → Tap for detail
```

### Fee Card Component
```
Amount + Due date + Status badge (Odendi/Bekliyor/Gecikti) + Payment action
```

### Attendance Screen Pattern
```
Date selector (top) → Student list with checkboxes → Bulk actions → Notes per student
```

### Development Chart Pattern
```
Height/Weight over time → BMI indicator → Age-appropriate ranges → Measurement history
```

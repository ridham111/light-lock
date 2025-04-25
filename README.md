# Light-Lock: Login UI & Image Lightbox

A responsive web application built with Next.js and TailwindCSS that features a clean login UI and an image lightbox gallery.

## Features

### Login UI
- Clean, responsive design that works on mobile and desktop
- Input fields with validation (email format, password required)
- Interactive button states (hover, disabled/loading, success/error)
- Mock authentication with hardcoded credentials
- Clear error messages for failed login attempts
- Success state on correct credentials

### Image Lightbox
- Responsive grid of thumbnail images
- Modal-style lightbox that opens when an image is clicked
- Enlarged image view with close button
- Navigation between images (next/previous)
- Keyboard support (Escape to close, arrow keys for navigation)

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/light-lock.git
cd light-lock
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Login Credentials
Use the following credentials to log in:
- Email: `user@example.com`
- Password: `password123`

Alternative credentials:
- Email: `admin@example.com`
- Password: `admin123`

### Image Gallery
After logging in, you'll be redirected to the dashboard where you can:
- View the image grid
- Click on any image to open the lightbox
- Use the navigation buttons or arrow keys to move between images
- Click outside the image or press Escape to close the lightbox

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [React](https://reactjs.org/) - UI library

## Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── app/         # Next.js app router pages
│   ├── components/  # Reusable UI components
│   └── lib/         # Utility functions and data
├── tailwind.config.mjs  # TailwindCSS configuration
└── package.json     # Project dependencies and scripts
```

## Key Components

- `LoginForm.tsx` - Handles user authentication
- `ImageGrid.tsx` - Displays the grid of thumbnail images
- `Lightbox.tsx` - Modal component for viewing enlarged images
- `Button.tsx` - Reusable button component with different states
- `Input.tsx` - Form input component with validation
- `Alert.tsx` - Displays success/error messages

## License

This project is licensed under the MIT License.

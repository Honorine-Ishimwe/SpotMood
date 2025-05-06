// import { signIn } from 'next-auth/react'

const GoogleSignUpButton = () => {
    return (
        <button
            className="flex w-full justify-center gap-5 rounded bg-white px-4 py-4 text-sm font-bold drop-shadow-md hover:bg-gray-50"
            onClick={() => signIn('google')}
        >
            <GoogleLogo />
            <div>Sign up with Google</div>
        </button>
    )
}

export default GoogleSignUpButton

// Reuse the same SVG logo
const GoogleLogo = (props) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 775 794"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        {/* ...paths from your original logo... */}
    </svg>
)
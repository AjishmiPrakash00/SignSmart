export default function LogoIcon({ size = 'md' }) {
  const sizeClass = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'
  const svgSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-6 h-6'

  return (
    <div className={`rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-500 text-white shadow ${sizeClass}`}>
      <svg className={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 5v6c0 5 3.8 9.7 8 11 4.2-1.3 8-6 8-11V5l-8-3z" fill="white" />
      </svg>
    </div>
  )
}

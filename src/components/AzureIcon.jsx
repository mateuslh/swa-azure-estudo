export default function AzureIcon({ className = '', size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="azure-grad-a" x1="0.85" y1="0.16" x2="0.15" y2="0.95">
          <stop offset="0%" stopColor="#114a8b" />
          <stop offset="100%" stopColor="#0078d4" />
        </linearGradient>
        <linearGradient id="azure-grad-b" x1="0.3" y1="0.3" x2="0.7" y2="0.85">
          <stop offset="0%" stopColor="#0078d4" stopOpacity="0" />
          <stop offset="100%" stopColor="#0078d4" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="azure-grad-c" x1="0.15" y1="0.25" x2="0.85" y2="0.75">
          <stop offset="0%" stopColor="#198ab3" />
          <stop offset="100%" stopColor="#0078d4" />
        </linearGradient>
      </defs>
      <path
        d="M33.338 6.544H58.82L33.617 89.456a3.972 3.972 0 01-3.78 2.74H8.166a3.973 3.973 0 01-3.769-5.201l23.95-73.23a3.974 3.974 0 013.991-2.221z"
        fill="url(#azure-grad-a)"
      />
      <path
        d="M68.742 61.289H33.327L55.403 9.284a3.974 3.974 0 013.668-2.74h20.874a3.973 3.973 0 013.097 6.468L68.742 61.289z"
        fill="url(#azure-grad-b)"
      />
      <path
        d="M87.833 92.196H63.041a4.003 4.003 0 01-3.779-2.74L37.09 19.784c-.746-2.284 1.066-4.635 3.78-4.635h22.47a4.003 4.003 0 013.779 2.74l21.172 64.73c.746 2.284-1.066 4.577-3.78 4.577h3.322z"
        fill="url(#azure-grad-c)"
      />
    </svg>
  );
}

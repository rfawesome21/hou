import RichText from '@/components/RichText'

interface AboutSectionProps {
  leftText: any
  rightText: any
  backgroundColor?: string
  headingSize?: string
  showCurve?: boolean
  marginTop?: string
  paddingTop?: string
  gapSize?: string
  button?: {
    text: string
    internalPage?: {
      slug: string
    }
    style?: 'primary' | 'secondary'
  }
  leftTextColor?: string
  rightTextColor?: string

  // NEW PROP
  leftWidth?: string // Tailwind class for width: e.g. "w-1/4", "w-[30%]"
}

export const aboutSectionBlock: React.FC<AboutSectionProps> = ({
  leftText,
  rightText,
  backgroundColor = 'white',
  headingSize = 'text-[64px]',
  showCurve = true,
  marginTop = 'default',
  paddingTop = 'default',
  gapSize = 'default',
  button,
  leftTextColor = 'text-black',
  rightTextColor = 'text-black',

  // Default width for left column
  leftWidth = 'w-1/4',
}) => {
  // Background mapping
  const bgClass =
    backgroundColor === 'black'
      ? 'bg-[#1e1c1c]'
      : backgroundColor === 'creme'
        ? 'bg-creme'
        : 'bg-creme'

  // Margin top mapping
  const marginTopClass =
    marginTop === 'none'
      ? 'mt-0'
      : marginTop === 'large'
        ? 'mt-[200px]'
        : marginTop === 'small'
          ? 'mt-[80px]'
          : marginTop === 'medium'
            ? 'mt-[140px]'
            : 'mt-[168px]' // default

  // Padding top mapping
  const paddingTopClass =
    paddingTop === 'none'
      ? 'py-0'
      : paddingTop === 'compressed'
        ? 'py-[40px]'
        : paddingTop === 'expanded'
          ? 'py-[103px]'
          : paddingTop === 'medium'
            ? 'py-[74px]'
            : 'py-[0px]' // default

  // Gap mapping
  const gapClass =
    gapSize === 'gap-[93px]'
      ? 'gap-[93px]'
      : gapSize === 'gap-[115px]'
        ? 'gap-[115px]'
        : 'gap-[115px]' // default

  return (
    <section className={`w-full relative ${bgClass} ${marginTopClass} ${paddingTopClass}`}>
      {/* SVG Curve Background */}
      {showCurve && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          viewBox="0 0 1446 614"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0H1446L1446 550C926.662 595 264.689 592 0 580V0Z"
            fill="#1E1C1C"
          />
        </svg>
      )}

      {/* Content */}
      <div className={`relative mx-auto flex px-[124px] ${gapClass} z-10`}>
        {leftText && (
          <RichText
            data={leftText}
            className={`${leftWidth} ${headingSize} font-normal font-libre-baskerville leading-normal text-right ${leftTextColor}`}
            enableGutter={false}
          />
        )}

        {rightText && (
          <RichText
            data={rightText}
            className={`w-[40%] font-quicksand text-2xl font-normal leading-9 ${rightTextColor}`}
            enableGutter={false}
          />
        )}
      </div>

      {button && button.text && button.internalPage && (
        <div className="flex justify-center mt-[50px]">
          <a
            href={button.internalPage?.slug || '#'}
            className={`inline-block px-6 py-[14px] rounded-full text-black font-inter font-normal ${
              button.style === 'secondary' ? 'bg-gray-500' : 'bg-creme'
            }`}
          >
            {button.text}
          </a>
        </div>
      )}
    </section>
  )
}

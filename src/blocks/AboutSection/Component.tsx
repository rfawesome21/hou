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
    internalPage?: { slug: string }
    style?: 'primary' | 'secondary'
  }
  leftTextColor?: string
  rightTextColor?: string
  leftWidth?: string
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
  leftWidth = 'w-1/4',
}) => {
  const bgClass =
    backgroundColor === 'black'
      ? 'bg-[#1e1c1c]'
      : backgroundColor === 'creme'
        ? 'bg-creme'
        : 'bg-creme'

  const marginTopClass =
    marginTop === 'none'
      ? 'mt-0'
      : marginTop === 'large'
        ? 'mt-[200px]'
        : marginTop === 'small'
          ? 'mt-[80px]'
          : marginTop === 'medium'
            ? 'mt-[140px]'
            : 'mt-[168px]'

  const paddingTopClass =
    paddingTop === 'none'
      ? 'py-0'
      : paddingTop === 'compressed'
        ? 'py-[40px]'
        : paddingTop === 'expanded'
          ? 'py-[103px]'
          : paddingTop === 'medium'
            ? 'py-[74px]'
            : 'py-[0px]'

  const gapClass =
    gapSize === 'gap-[93px]'
      ? 'gap-[93px]'
      : gapSize === 'gap-[115px]'
        ? 'gap-[115px]'
        : 'gap-[115px]'

  return (
    <section className={`w-full relative ${bgClass} ${marginTopClass} ${paddingTopClass}`}>
      {showCurve && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          viewBox="0 0 1446 614"
          fill="none"
          preserveAspectRatio="none"
        >
          <path d="M0 0H1446L1446 550C926.662 595 264.689 592 0 580V0Z" fill="#1E1C1C" />
        </svg>
      )}

      {/* RESPONSIVE CONTENT WRAPPER */}
      <div
        className={`
          relative mx-auto z-10
          flex flex-col md:flex-row
          px-6 md:px-[124px] mb-32 md:mb-[168px]
          ${gapClass}
        `}
      >
        {/* LEFT COLUMN */}
        {leftText && (
          <RichText
            data={leftText}
            className={`
              ${leftWidth}
              md:${leftWidth}
              w-full md:w-auto
              ${headingSize}
              font-normal font-libre-baskerville
              leading-normal md:text-right text-center
              ${leftTextColor}
            `}
            enableGutter={false}
          />
        )}

        {/* RIGHT COLUMN */}
        {rightText && (
          <RichText
            data={rightText}
            className={`
              w-full md:w-[40%]
              font-quicksand text-lg md:text-2xl
              font-normal leading-7 md:leading-9
              text-center md:text-left
              ${rightTextColor}
            `}
            enableGutter={false}
          />
        )}
      </div>

      {button?.text && button.internalPage && (
        <div className="flex justify-center mt-[50px]">
          <a
            href={button.internalPage.slug || '#'}
            className={`
              inline-block px-6 py-[14px] rounded-full text-black font-inter font-normal
              ${button.style === 'secondary' ? 'bg-gray-500' : 'bg-creme'}
            `}
          >
            {button.text}
          </a>
        </div>
      )}
    </section>
  )
}

export function ResAvenueBlackLogo() {
  return (
    <svg
      width="156"
      height="23"
      viewBox="0 0 156 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect
        width="156"
        height="22.2857"
        fill="url(#pattern0_1808_11893)"
        style={{ mixBlendMode: "luminosity" }}
      />
      <defs>
        <pattern
          id="pattern0_1808_11893"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_1808_11893"
            transform="matrix(0.000992064 0 0 0.00694444 -0.00049605 0)"
          />
        </pattern>
        <image
          id="image0_1808_11893"
          width="1009"
          height="144"
          preserveAspectRatio="none"
          xlinkHref="/images/brand/logo-black-raster.png"
        />
      </defs>
    </svg>
  )
}

export function ResAvenueWhiteLogo() {
  return (
    <svg
      width="167"
      height="26"
      viewBox="0 0 167 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="166.992" height="25.3828" fill="url(#pattern0_1808_12249)" />
      <defs>
        <pattern
          id="pattern0_1808_12249"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_1808_12249"
            transform="scale(0.0005 0.00328947)"
          />
        </pattern>
        <image
          id="image0_1808_12249"
          width="2000"
          height="304"
          preserveAspectRatio="none"
          xlinkHref="/images/brand/logo-white-raster.png"
        />
      </defs>
    </svg>
  )
}

export function HamburgerMenuSvg() {
  return (
    <svg
      width="28"
      height="21"
      viewBox="0 0 28 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="28" height="3" fill="currentColor" />
      <rect width="28" height="3" transform="translate(0 9)" fill="currentColor" />
      <rect width="28" height="3" transform="translate(0 18)" fill="currentColor" />
    </svg>
  )
}

export function DnaSvg({ id = "default" }: { id?: string } = {}) {
  const maskId = `dna-mask-${id}`
  const patternId = `dna-pattern-${id}`
  const imageId = `dna-image-${id}`

  return (
    <svg width="622" height="657" viewBox="0 0 622 657" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <mask id={maskId} style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="622" height="657">
        <rect x="622" y="656.879" width="622" height="656.878" transform="rotate(-180 622 656.879)" fill={`url(#${patternId})`} />
      </mask>
      <g mask={`url(#${maskId})`}>
        <rect x="622.5" y="645.32" width="622" height="656.878" transform="rotate(-180 622.5 645.32)" fill="currentColor" fillOpacity="0.7" />
      </g>
      <defs>
        <pattern id={patternId} patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref={`#${imageId}`} transform="scale(0.000934579 0.000884956)" />
        </pattern>
        <image id={imageId} width="1070" height="1130" preserveAspectRatio="none" xlinkHref="/images/brand/dna-pattern-raster.png" />
      </defs>
    </svg>

  )
}

export function AddSvg() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="20" fill="#ED862E" />
      <g clipPath="url(#clip0_1890_11849)">
        <g clipPath="url(#clip1_1890_11849)">
          <g clipPath="url(#clip2_1890_11849)">
            <path
              d="M19.9999 14.2188V19.9999M19.9999 19.9999V25.781M19.9999 19.9999H14.2188M19.9999 19.9999H25.781"
              stroke="white"
              strokeWidth="1.65175"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1890_11849">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(13 13)"
          />
        </clipPath>
        <clipPath id="clip1_1890_11849">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(13 13)"
          />
        </clipPath>
        <clipPath id="clip2_1890_11849">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(13 13)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export interface PopupIconProps {
  /** Applied to the wrapping <svg>. */
  className?: string
  /** Applied to the background <rect>. Use to drive fill changes (e.g. via group-hover). */
  rectClassName?: string
  /** Applied to the top-right arrow <path>. */
  topArrowClassName?: string
  /** Applied to the bottom-left arrow <path>. */
  bottomArrowClassName?: string
}

/**
 * "Expand" icon — rounded square with two diagonal arrow corners pointing
 * outward. The internal elements expose `className` slots so consumers can
 * drive hover/active state from the parent via `group-hover/*` utilities
 * without duplicating the SVG.
 */
export function PopupIcon({
  className,
  rectClassName,
  topArrowClassName,
  bottomArrowClassName,
}: PopupIconProps = {}) {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        width="46"
        height="46"
        rx="4"
        fill="#FEFAF5"
        className={rectClassName}
      />
      <path
        d="M28.393 22.5704L28.5678 17.5648L23.5621 17.39"
        stroke="#ED862E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={topArrowClassName}
      />
      <path
        d="M16.6872 23.4229L16.4251 28.4247L21.4269 28.6868"
        stroke="#ED862E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={bottomArrowClassName}
      />
    </svg>
  )
}

export interface CloseBtnProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  bgColor?: string
  iconColor?: string
  size?: number | string
}

export function CloseBtn({
  className,
  bgColor = "#ED862E",
  iconColor = "#F5F4F0",
  size = 40,
  ...props
}: CloseBtnProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <rect width="40" height="40" rx="4" fill={bgColor} />
      <path fillRule="evenodd" clipRule="evenodd" d="M14.7928 14.7936C14.9803 14.6061 15.2346 14.5008 15.4998 14.5008C15.765 14.5008 16.0193 14.6061 16.2068 14.7936L19.9998 18.5866L23.7928 14.7936C23.885 14.6981 23.9954 14.6219 24.1174 14.5695C24.2394 14.5171 24.3706 14.4895 24.5034 14.4883C24.6362 14.4872 24.7678 14.5125 24.8907 14.5627C25.0136 14.613 25.1253 14.6873 25.2192 14.7812C25.3131 14.8751 25.3873 14.9867 25.4376 15.1096C25.4879 15.2325 25.5132 15.3642 25.512 15.497C25.5109 15.6298 25.4833 15.761 25.4309 15.883C25.3785 16.005 25.3023 16.1153 25.2068 16.2076L21.4138 20.0006L25.2068 23.7936C25.3889 23.9822 25.4897 24.2348 25.4875 24.497C25.4852 24.7592 25.38 25.01 25.1946 25.1954C25.0092 25.3808 24.7584 25.486 24.4962 25.4882C24.234 25.4905 23.9814 25.3897 23.7928 25.2076L19.9998 21.4146L16.2068 25.2076C16.0182 25.3897 15.7656 25.4905 15.5034 25.4882C15.2412 25.486 14.9904 25.3808 14.805 25.1954C14.6196 25.01 14.5144 24.7592 14.5121 24.497C14.5098 24.2348 14.6106 23.9822 14.7928 23.7936L18.5858 20.0006L14.7928 16.2076C14.6053 16.02 14.5 15.7657 14.5 15.5006C14.5 15.2354 14.6053 14.9811 14.7928 14.7936Z" fill={iconColor} />
    </svg>

  )
}

interface CheckedIconProps {
  color?: string
  className?: string
}

export function CheckedIcon({
  color = "#EC7513",
  className,
}: CheckedIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      className={className}
    >
      <path
        d="M7.16667 12.1667L13.0417 6.29167L11.875 5.125L7.16667 9.83333L4.79167 7.45833L3.625 8.625L7.16667 12.1667ZM8.33333 16.6667C7.18056 16.6667 6.09722 16.4479 5.08333 16.0104C4.06944 15.5729 3.1875 14.9792 2.4375 14.2292C1.6875 13.4792 1.09375 12.5972 0.65625 11.5833C0.21875 10.5694 0 9.48611 0 8.33333C0 7.18056 0.21875 6.09722 0.65625 5.08333C1.09375 4.06944 1.6875 3.1875 2.4375 2.4375C3.1875 1.6875 4.06944 1.09375 5.08333 0.65625C6.09722 0.21875 7.18056 0 8.33333 0C9.48611 0 10.5694 0.21875 11.5833 0.65625C12.5972 1.09375 13.4792 1.6875 14.2292 2.4375C14.9792 3.1875 15.5729 4.06944 16.0104 5.08333C16.4479 6.09722 16.6667 7.18056 16.6667 8.33333C16.6667 9.48611 16.4479 10.5694 16.0104 11.5833C15.5729 12.5972 14.9792 13.4792 14.2292 14.2292C13.4792 14.9792 12.5972 15.5729 11.5833 16.0104C10.5694 16.4479 9.48611 16.6667 8.33333 16.6667ZM8.33333 15C10.1944 15 11.7708 14.3542 13.0625 13.0625C14.3542 11.7708 15 10.1944 15 8.33333C15 6.47222 14.3542 4.89583 13.0625 3.60417C11.7708 2.3125 10.1944 1.66667 8.33333 1.66667C6.47222 1.66667 4.89583 2.3125 3.60417 3.60417C2.3125 4.89583 1.66667 6.47222 1.66667 8.33333C1.66667 10.1944 2.3125 11.7708 3.60417 13.0625C4.89583 14.3542 6.47222 15 8.33333 15Z"
        fill={color}
      />
    </svg>
  )
}

export function ContactUsCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M2.75 3.95V8.5C2.75 13.05 8.32143 15 8.32143 15C8.32143 15 13.8929 13.05 13.8929 8.5V3.95L8.32143 2L2.75 3.95Z"
        stroke="white"
        strokeWidth="1.2381"
        strokeLinecap="square"
      />
      <path
        d="M5.95312 7.98761L7.70317 9.73828L11.2051 6.23633"
        stroke="white"
        strokeWidth="1.2381"
        strokeLinecap="square"
      />
    </svg>

  )
}

export function LinkedIn({ className }: { className: string }) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="34" height="34" rx="9" fill="white" fillOpacity="0.05" />
      <path d="M13.0647 20.6016V14.2836H14.1307V20.6016H13.0647ZM13.5977 12.9836C13.3897 12.9836 13.2164 12.9186 13.0777 12.7886C12.9477 12.6586 12.8827 12.4896 12.8827 12.2816C12.8827 12.0736 12.9477 11.9046 13.0777 11.7746C13.2164 11.6446 13.3897 11.5796 13.5977 11.5796C13.8057 11.5796 13.9747 11.6446 14.1047 11.7746C14.2434 11.9046 14.3127 12.0736 14.3127 12.2816C14.3127 12.4896 14.2434 12.6586 14.1047 12.7886C13.9747 12.9186 13.8057 12.9836 13.5977 12.9836ZM16.264 20.6016V14.2836H17.148L17.239 15.1936H17.278C17.5813 14.8902 17.902 14.6389 18.24 14.4396C18.578 14.2316 18.9636 14.1276 19.397 14.1276C20.0643 14.1276 20.5496 14.3399 20.853 14.7646C21.165 15.1806 21.321 15.7916 21.321 16.5976V20.6016H20.255V16.7406C20.255 16.1426 20.1596 15.7136 19.969 15.4536C19.787 15.1849 19.4836 15.0506 19.059 15.0506C18.7383 15.0506 18.448 15.1329 18.188 15.2976C17.9366 15.4622 17.6506 15.7049 17.33 16.0256V20.6016H16.264Z" fill="white" fillOpacity="0.35" />
    </svg>

  )
}

export function Facebook({ className }: { className: string }) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="34" height="34" rx="9" fill="white" fillOpacity="0.05" />
      <path d="M16.5099 20.6016V13.2826C16.5099 12.8579 16.5749 12.4896 16.7049 12.1776C16.8349 11.8569 17.0342 11.6142 17.3029 11.4496C17.5802 11.2762 17.9312 11.1896 18.3559 11.1896C18.5466 11.1896 18.7329 11.2112 18.9149 11.2546C19.1056 11.2892 19.2702 11.3369 19.4089 11.3976L19.1749 12.1776C18.9236 12.0996 18.6852 12.0606 18.4599 12.0606C18.1652 12.0606 17.9442 12.1646 17.7969 12.3726C17.6496 12.5719 17.5759 12.8752 17.5759 13.2826V20.6016H16.5099ZM15.5739 15.1546V14.3486L16.5619 14.2836H18.9149V15.1546H15.5739Z" fill="white" fillOpacity="0.35" />
    </svg>

  )
}

export function Twitter({ className }: { className: string }) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="34" height="34" rx="9" fill="white" fillOpacity="0.05" />
      <path d="M13.4831 20.6016L16.2651 16.6496L12.9371 11.3196H15.5761L17.6691 14.6736L20.0221 11.3196H20.8671L18.0591 15.3106L21.3741 20.6016H18.7351L16.6681 17.2996L14.3281 20.6016H13.4831ZM19.1121 19.9126H20.1391L15.1991 12.0086H14.1721L19.1121 19.9126Z" fill="white" fillOpacity="0.35" />
    </svg>

  )
}



export function PlayButton({ className }: { className: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="77" height="77" viewBox="0 0 77 77" fill="none">
      <rect width="77" height="77" rx="38.5" fill="white" />
      <path d="M27.2787 55.3605C27.6475 55.5819 28.0655 55.6802 28.4835 55.6802C28.9016 55.6802 29.3688 55.5573 29.7376 55.336L54.3272 40.5822C55.0649 40.1396 55.5321 39.3281 55.5321 38.4675C55.5321 37.6069 55.0895 36.7954 54.3272 36.3528L29.7376 21.5991C29.364 21.3724 28.9362 21.2505 28.4992 21.2462C28.0622 21.2419 27.6321 21.3553 27.2541 21.5745C26.4918 22.0171 26 22.8285 26 23.7138V53.2213C26 54.1065 26.4672 54.9179 27.2541 55.3605H27.2787Z" fill="black" />
    </svg>
  )
}

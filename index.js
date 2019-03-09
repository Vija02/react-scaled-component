import React, { useRef } from 'react'
import useComponentSize from '@rehooks/component-size'

export default props => {
	const shadowRef = useRef({ current: null })
	const shadowSize = useComponentSize(shadowRef)

	const containerRef = useRef(null)
	const containerSize = useComponentSize(containerRef)

	return (
		<div ref={containerRef} style={{ position: 'relative' }}>
			<div
				style={
					containerSize.width < shadowSize.width
						? {
								transform: `scale(${Math.min(containerSize.width / shadowSize.width, 1)})`,
								transformOrigin: 'top left',
						  }
						: {}
				}
			>
				{props.children}
			</div>
			<div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0 }}>
				<div rootRef={shadowRef}>{props.children}</div>
			</div>
		</div>
	)
}


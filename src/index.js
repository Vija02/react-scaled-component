import React, { useRef } from 'react'
import useComponentSize from '@rehooks/component-size'

export default props => {
	const shadowRef = useRef({ current: null })
	const shadowSize = useComponentSize(shadowRef)

	const containerRef = useRef(null)
	const containerSize = useComponentSize(containerRef)

	const shouldScale = containerSize.width < shadowSize.width
	const scale = Math.min(containerSize.width / shadowSize.width, 1)

	return (
		<div ref={containerRef} style={shouldScale ? { position: 'relative', height: shadowSize.height * scale } : { position: 'relative' }}>
			<div
				style={
					shouldScale
						? {
							transform: `scale(${scale})`,
							transformOrigin: 'top left',
						}
						: {}
				}
			>
				{props.children}
			</div>
			<div style={{ pointerEvents: 'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0 }}>
				{props.renderChild && typeof props.renderChild === 'function' ? (
					props.renderChild(shadowRef, props.children)
				) : (
					<div ref={shadowRef}>{props.children}</div>
				)}
			</div>
		</div>
	)
}

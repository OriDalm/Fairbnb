import { useEffect, useRef } from 'react'

export function AirbnbBtn({ txt, callBackFunction, children }) {
    const buttonRef = useRef(null)

    useEffect(() => {
        const button = buttonRef.current

        if (!button) return

        const handleMouseMove = (ev) => {
            const rect = button.getBoundingClientRect()
            const x = ((ev.clientX - rect.left) * 100) / button.clientWidth
            const y = ((ev.clientY - rect.top) * 100) / button.clientHeight
            button.style.setProperty('--mouse-x', x)
            button.style.setProperty('--mouse-y', y)
        };

        button.addEventListener('mousemove', handleMouseMove)

        return () => {
            button.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <button ref={buttonRef} className="btn-reserve" onClick={callBackFunction}>
            {txt}
            {children}
        </button>
    )
}

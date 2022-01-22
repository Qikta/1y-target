import { useCallback, useEffect, useState } from "react";


export default function useModal() {
    const [toggle, setToggle] = useState(false)

    const open = useCallback(() => setToggle(() => true), [setToggle])

    const close = useCallback(() => setToggle(() => false), [setToggle])

    return {
        open,
        close,
        toggle
    }
}
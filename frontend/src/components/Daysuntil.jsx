import { useEffect, useState } from "react";

export default function DaysUntil({ targetDate }) {
    const [daysRemaining, setDaysRemaining] = useState(null);

    useEffect(() => {
        const calculate = () => {
            const now = new Date();
            const target = new Date(targetDate);

            if (now > target) {
                target.setFullYear(now.getFullYear() + 1);
            }

            const diffTime = target - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            setDaysRemaining(diffDays);
        };

        calculate();
    }, [targetDate]);

    return (
 <div className="text-center">
            <div
                className="fw-bold px-4 py-2 rounded mb-1 shadow-sm"
                style={{
                    fontSize: "2.5rem",
                    fontFamily: "'Orbitron', monospace",
                    background: "linear-gradient(to right, #dc2626, #b91c1c)",
                    color: "white",
                    display: "inline-block",
                    minWidth: "140px",
                }}
            >
                {daysRemaining !== null ? daysRemaining : "…"}
            </div>
        </div>
    );
}


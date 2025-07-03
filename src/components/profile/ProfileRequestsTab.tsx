import { UserRequest } from "@/hooks/useUserRequests";
import Link from "next/link";

export default function ProfileRequestsTab({ userRequests }: { userRequests: UserRequest[] }) {
    const getStatusLabel = (status: string) => {
        const classes = "text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-foreground";
        switch (status) {
            case 'SUBMITTED':
                return <span className={classes}>Submitted</span>;
            case 'IN_PROGRESS':
                return <span className={classes}>In Progress</span>;
            case 'COMPLETED':
                return <span className={classes}>Completed</span>;
            default:
                return <span className={classes}>Unknown</span>;
        }
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    const renderRequestContent = (raw: string) => {
        try {
            console.log("RAW: ", raw);
            const parsed = JSON.parse(raw);

            console.log("PARSED REQUEST: ", parsed);

            if (parsed.model && parsed.manufacturer) {
                return (
                    <>
                        <p className="font-medium">New Motorcycle Request</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            {parsed.manufacturer} – {parsed.model} ({parsed.yearRange || "N/A"})
                        </p>
                    </>
                );
            }

            if (parsed.data && Array.isArray(parsed.data)) {
                return (
                    <>
                        <p className="font-medium">Update Motorcycle Fields</p>
                        <ul className="mt-1 text-sm text-muted-foreground list-disc list-inside space-y-0.5">
                            {parsed.data.map((item: any, idx: number) => (
                                <li key={idx}>
                                    <strong>{item.field}</strong>: {item.oldValue} → {item.newValue}
                                </li>
                            ))}
                        </ul>
                    </>
                );
            }

            if (parsed.text) {
                return (
                    <>
                        <p className="font-medium"><strong>{parsed.type}</strong></p>
                        <span className="text-sm text-muted-foreground mt-1">
                            {parsed.subject ?? `: ${parsed.subject}`}
                            <p className="pt-2">{parsed.text}</p>
                        </span>
                    </>
                );
            }

            return <p className="text-sm text-muted-foreground">Unknown request format</p>;
        } catch (e) {
            return <p className="text-sm text-muted-foreground">Invalid request data</p>;
        }
    };

    if (userRequests.length === 0) {
        return (
            <div className="border-2 border-dashed rounded-xl p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-muted mb-3">
                    <span className="text-foreground">💬</span>
                </div>
                <h4 className="text-lg font-medium text-foreground mb-1">No requests yet</h4>
                <p className="text-muted-foreground mb-4">
                    Ask our team to add new motorcycles, features, or report issues
                </p>
                <Link
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                    href={"/submit"}
                >
                    Submit your first request ›
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                    My Requests <span className="text-muted-foreground">({userRequests.length})</span>
                </h3>
                {userRequests.length > 0 && (
                    <Link
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                        href={"/submit"}
                    >
                        New request ›
                    </Link>
                )}
            </div>

            <div className="space-y-4">
                {userRequests.map((request, index) => (
                    <div
                        key={index}
                        className="border border-border rounded-lg p-4 space-y-2"
                    >
                        <div className="flex justify-between items-start">
                            <div>{renderRequestContent(request.requestContent)}</div>
                            <div className="text-right space-y-1">
                                {getStatusLabel(request.status)}
                                <p className="text-xs text-muted-foreground">
                                    📅 {formatDate(request.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {userRequests.length > 0 && (
                <div className="border-t pt-6 text-center">
                    <p className="text-muted-foreground mb-3">Your requests help us improve the platform</p>
                    <Link
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                        href={"/submit"}
                    >
                        ⌯⌲ Submit another request
                    </Link>
                </div>
            )}
        </div>
    );
}
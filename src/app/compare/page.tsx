import ComparePageShell from "@/components/comparison/ComparePageShell";
import CompareMotorcycles from "@/components/comparison/CompareMotorcycles";

export default async function ComparePage() {
    return (
        <ComparePageShell>
            <CompareMotorcycles />
        </ComparePageShell>
    );
}

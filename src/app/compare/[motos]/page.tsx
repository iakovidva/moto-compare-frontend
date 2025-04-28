import ComparePageShell from "@/components/comparison/ComparePageShell";
import CompareMotorcycles from "@/components/comparison/CompareMotorcycles";

type Params = {
    motos: string;
};

type Props = {
    params: Promise<Params>
}

export default async function CompareMotosPage({ params }: Props) {

    const { motos } = await params;

    return (
        <ComparePageShell>
            <CompareMotorcycles />
        </ComparePageShell>
    );
}
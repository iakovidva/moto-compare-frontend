
type Params = {
    category: string
}

type Props = {
    params: Promise<Params>;
}

export default async function CategoryPage({ params }: Props) {

    const { category } = await params;
    return <h1 className="m-24 text-center text-3xl">
        Category motherfucker {category}
    </h1>
}
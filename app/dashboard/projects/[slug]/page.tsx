export default function ProjectPage({ params }: { params: { slug: string } }) {
    return <h1>{params.slug}</h1>;
}
import Link from 'next/link'

function Navigation() {
    return (
    <ul>
        <li>
        <Link href={"/"}>Home</Link> 
        </li>
        <li>
        <Link href={"/comics"}>Comics</Link>
        </li>
    </ul>
    );
}

export default Navigation;

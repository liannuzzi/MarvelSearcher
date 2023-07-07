import Link from 'next/link'

function Navigation() {
    return (
    <div>
    <nav>
    <ul>
        <li>
        <Link href={"/"}>Home</Link> 
        </li>
    </ul>
 </nav>
 </div>
    );
}

export default Navigation;

// import {FiBell} from 'react-icons/fi'

const Header = () => {
    return (
        <>
        <header id="header">
            <div className="d-flex flex-row-reverse bd-highlight">
                {/**
                <div id="notifier" className="bd-highlight">
                    <FiBell size="lg"/>
                </div>
                 */}
                {/** Search Section */}
                <div id="top-header" className="bd-highlight">
                    <form>
                        <input type="text" className="input-control" placeholder="Search Here" />
                    </form>
                </div>
            </div>
        </header>
        </>
    );
}

export default Header
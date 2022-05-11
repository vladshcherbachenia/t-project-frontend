import React, {Component} from 'react';

class Paginator extends Component<{ lastPage: number, handlePageChange: any }> {
    state={
        page: 1
    }

    prev = () => {
        if (this.state.page === 1) return;

        this.setState({
            page: --this.state.page
        })

        this.props.handlePageChange(this.state.page);
    }

    next = () => {
        if (this.state.page === this.props.lastPage) return;

        this.setState({
            page: ++this.state.page
        })

        this.props.handlePageChange(this.state.page);
    }

    render() {
        return (
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={this.prev}>Предыдущая страница</a>
                    </li>
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={this.next}>Следующая страница</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Paginator;
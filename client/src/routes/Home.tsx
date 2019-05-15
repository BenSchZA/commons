import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../context'
import { Logger } from '@oceanprotocol/squid'
import Spinner from '../components/atoms/Spinner'
import Asset from '../components/molecules/Asset'
import CategoryImage from '../components/atoms/CategoryImage'
import Button from '../components/atoms/Button'
import Form from '../components/atoms/Form/Form'
import Input from '../components/atoms/Form/Input'
import Route from '../components/templates/Route'
import styles from './Home.module.scss'

import meta from '../data/meta.json'
import formPublish from '../data/form-publish.json'
import { History } from 'history'
import Content from '../components/atoms/Content'

interface HomeProps {
    history: History
}

interface HomeState {
    search?: string
    categoryAssets?: any[]
    isLoading?: boolean
}

const categories =
    (formPublish.steps[1].fields &&
        formPublish.steps[1].fields.categories &&
        formPublish.steps[1].fields.categories.options) ||
    []

class Home extends Component<HomeProps, HomeState> {
    public state = {
        search: '',
        categoryAssets: [],
        isLoading: true
    }

    public async componentDidMount() {
        this.getCategoryAssets()
    }

    private getCategoryAssets = async () => {
        const { ocean } = this.context

        const searchQuery = {
            offset: 25,
            page: 1,
            query: {
                categories: ['Engineering'],
                price: [-1, 1]
            },
            sort: {
                datePublished: 1
            }
        }

        try {
            const search = await ocean.aquarius.queryMetadata(searchQuery)
            this.setState({
                categoryAssets: search.results,
                isLoading: false
            })
        } catch (error) {
            Logger.error(error)
            this.setState({ isLoading: false })
        }
    }

    public render() {
        const { categoryAssets, isLoading, search } = this.state
        return (
            <Route
                title={meta.title}
                description={meta.description}
                className={styles.home}
            >
                <Content>
                    <Form onSubmit={this.searchAssets} minimal>
                        <Input
                            type="search"
                            name="search"
                            label="Search for data sets"
                            placeholder="e.g. shapes of plants"
                            value={search}
                            onChange={this.inputChange}
                            group={
                                <Button primary disabled={!search}>
                                    Search
                                </Button>
                            }
                        />
                    </Form>
                </Content>

                <Content wide>
                    <h4>AI for Good</h4>
                    <div>
                        {isLoading ? (
                            <Spinner message="Loading..." />
                        ) : categoryAssets && categoryAssets.length ? (
                            <div className={styles.results}>
                                {categoryAssets.map((asset: any) => (
                                    <Asset key={asset.id} asset={asset} />
                                ))}
                            </div>
                        ) : (
                            <div>No data sets found.</div>
                        )}
                    </div>
                    <h4>Explore Categories</h4>
                    <div className={styles.categories}>
                        {categories.map((category: string) => (
                            <Link
                                to={`/search?categories=${category}`}
                                key={category}
                            >
                                <CategoryImage category={category} />
                                {category}
                            </Link>
                        ))}
                    </div>
                </Content>
            </Route>
        )
    }

    private inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    private searchAssets = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        this.props.history.push(`/search?text=${this.state.search}`)
    }
}

Home.contextType = User
export default Home

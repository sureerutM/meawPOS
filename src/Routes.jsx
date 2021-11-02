import { lazy, Suspense } from "react"
import {  Route, Switch } from "react-router-dom"


const Home = lazy(() =>
    import("./pages/Home").then(({ Home }) => ({
        default: Home,
    }))
)
const Food = lazy(() =>
    import("./pages/Food").then(({ Food }) => ({
        default: Food,
    }))
)
const ProtectRoute = () => {
    return <>
        <Route exact path="/" component={Home} />
        <Route exact path="/food" component={Food} />
    </>

}

export const Routes = () => {
    return <Suspense
        fallback={<div>loading</div>}
    >
        <Switch>
            <ProtectRoute />
        </Switch>
    </Suspense>
}
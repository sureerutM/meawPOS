
import { Grid } from "@mui/material"
import React from "react"
import { withRouter } from "react-router"
import { Header } from "./Header"
import { SummaryBar } from "./SummaryBar"

export const AppWrapper = withRouter(
    (
        props
    ) => {
        const { children } = props

        return (
            <div>
                <main style={{ height: "100vh" }}>
                    <Grid container={true}>
                        <Grid item={true} xs={8}>
                            <Header />
                            <div style={{ width: "100%" }}>{children}</div>
                        </Grid>
                        <Grid item={true} xs={4}>
                            <SummaryBar/>
                        </Grid>
                    </Grid>
                </main>
            </div>
        )
    }
)

import { Box, Button, Typography } from "@mui/material"
import { useGetHeroProductsQuery } from "../api/productsApi"
import { useState } from "react"
import { HeroProductComponent } from "./HeroProductComponent"

export const HeroSection = () => {
    const { data, isLoading } = useGetHeroProductsQuery()
    const [index, setIndex] = useState(0)

    const heroProducts = data?.data

    if (isLoading) return <Box>Loading...</Box>
    if (!heroProducts) return <Box>Products not found!</Box>

    const heroProductComponents = heroProducts.map(product => <HeroProductComponent product={product} />)

    const handleNextClick = () => {
        if (index < heroProducts.length - 1) {
            setIndex((current) => current + 1)
        }
    }

    const handlePrevClick = () => {
        if (index > 0) {
            setIndex((current) => current - 1)
        }
    }

    return (
        <>
            {heroProductComponents[index]}
            <Button onClick={handlePrevClick}>Previous</Button>
            <Button onClick={handleNextClick}>Next</Button>

        </>
    )
}

const WeatherIcon = (props: any) => {
    const { icon, size, ...rest } = props;

    return (
        <img src={`https://openweathermap.org/img/wn/${icon}${size ? `@${size}x` : ""}.png`} {...rest}></img>
    )
}

export default WeatherIcon
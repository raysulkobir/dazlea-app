export const Badge = ({ text, color = 'blue' }) => {
    const colors = {
        blue: 'bg-blue-100 text-blue-800',
        green: 'bg-green-100 text-green-800',
        red: 'bg-red-100 text-red-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        purple: 'bg-purple-100 text-purple-800',
    };

    return (
        <StyledView className={`${colors[color]} rounded-full px-3 py-1 self-start`}>
            <StyledText className={`text-xs font-semibold ${colors[color].split(' ')[1]}`}>
                {text}
            </StyledText>
        </StyledView>
    );
};
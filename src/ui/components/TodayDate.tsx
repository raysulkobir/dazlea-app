// Today's Date Component
export const TodayDate = () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = today.toLocaleDateString('en-US', options);
    const time = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return (
        <StyledView className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 mb-4">
            <StyledText className="text-white text-sm font-medium mb-1">TODAY</StyledText>
            <StyledText className="text-white text-2xl font-bold mb-1">{dateString}</StyledText>
            <StyledText className="text-white text-lg">{time}</StyledText>
        </StyledView>
    );
};

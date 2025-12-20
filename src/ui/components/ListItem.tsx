export const ListItem = ({ title, subtitle, rightText, onPress }) => {
    return (
        <StyledTouchableOpacity
            className="bg-white border-b border-gray-100 py-4 px-4 flex-row items-center justify-between"
            onPress={onPress}
        >
            <StyledView className="flex-1">
                <StyledText className="text-base font-semibold text-gray-800 mb-1">
                    {title}
                </StyledText>
                {subtitle && (
                    <StyledText className="text-sm text-gray-500">{subtitle}</StyledText>
                )}
            </StyledView>
            {rightText && (
                <StyledText className="text-gray-400 ml-2">{rightText}</StyledText>
            )}
        </StyledTouchableOpacity>
    );
};
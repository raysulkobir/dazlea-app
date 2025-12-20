xport const Alert = ({ type = 'info', message }) => {
    const types = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
    };

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
    };

    return (
        <StyledView className={`${types[type]} rounded-xl p-4 mb-4 border flex-row items-center`}>
            <StyledText className="text-xl mr-3">{icons[type]}</StyledText>
            <StyledText className={`flex-1 ${types[type].split(' ')[2]}`}>{message}</StyledText>
        </StyledView>
    );
};
/ Demo App
export default function ComponentDemo() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <StyledScrollView className="flex-1 bg-gray-50">
            <StyledView className="p-6">
                <StyledText className="text-3xl font-bold text-gray-900 mb-6">
                    UI Components Demo
                </StyledText>

                <TodayDate />

                <Alert type="success" message="Your profile has been updated successfully!" />

                <Card title="Login Form" subtitle="Enter your credentials">
                    <Input
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        icon="📧"
                    />
                    <Input
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        icon="🔒"
                    />
                    <Button title="Sign In" onPress={() => alert('Login pressed!')} />
                    <Button
                        title="Sign Up"
                        variant="outline"
                        onPress={() => alert('Sign up pressed!')}
                    />
                </Card>

                <Card title="Button Variants">
                    <Button title="Primary Button" variant="primary" onPress={() => { }} />
                    <Button title="Secondary Button" variant="secondary" onPress={() => { }} />
                    <Button title="Success Button" variant="success" onPress={() => { }} />
                    <Button title="Danger Button" variant="danger" onPress={() => { }} />
                    <Button title="Disabled Button" disabled onPress={() => { }} />
                </Card>

                <Card title="Badges">
                    <StyledView className="flex-row flex-wrap gap-2">
                        <Badge text="New" color="blue" />
                        <Badge text="Success" color="green" />
                        <Badge text="Error" color="red" />
                        <Badge text="Warning" color="yellow" />
                        <Badge text="Premium" color="purple" />
                    </StyledView>
                </Card>

                <Card title="List Items">
                    <ListItem
                        title="Settings"
                        subtitle="Manage your account"
                        rightText="›"
                        onPress={() => { }}
                    />
                    <ListItem
                        title="Notifications"
                        subtitle="Push notifications settings"
                        rightText="›"
                        onPress={() => { }}
                    />
                    <ListItem
                        title="Privacy"
                        subtitle="Control your privacy"
                        rightText="›"
                        onPress={() => { }}
                    />
                </Card>

                <Alert type="info" message="This is an informational message." />
                <Alert type="warning" message="Warning: Please check your input." />
                <Alert type="error" message="Error: Something went wrong." />
            </StyledView>
        </StyledScrollView>
    );
}
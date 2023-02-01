import SignInComponent from 'components/organisms/SignIn'
import DefaultTemplate from 'components/templates/DefaultTemplate'

const SignIn = () => {
    return (
        <DefaultTemplate container={false} title='Entrar' hasMenu={false} hasFooter={false}>
            <SignInComponent />
        </DefaultTemplate>
    )
}

export default SignIn

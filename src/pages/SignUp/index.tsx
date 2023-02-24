import SignUpComponent from 'components/organisms/SignUp'
import DefaultTemplate from 'components/templates/DefaultTemplate'

const SignUp = () => {
    return (
        <DefaultTemplate title='Cadastro' hasMenu={false} hasFooter={false}>
            <SignUpComponent />
        </DefaultTemplate>
    )
}

export default SignUp

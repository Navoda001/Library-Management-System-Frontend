import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const SignIn = () => {
    return (
        <>
            <h1>Sign up</h1>
            <Form className="d-flex flex-column align-items-center mt-5">
                <div className="w-50">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control

                            type="email"
                            placeholder="Enter Email"

                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control

                            type="password"
                            placeholder="Enter Password"

                        />
                    </Form.Group>

                    <Button variant="success" type="submit">
                        SignIn
                    </Button>
                </div>
            </Form>
        </>

    )



}
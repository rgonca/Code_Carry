import React, { Component } from 'react'
import ProfileService from './../../service/profileService'
import FilesService from './../../service/fileService'
import Spinner from './../ui/spinner'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class EditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            role: '',
            image_url: '',
            email: '',
            skill: [''],
            editing: true
        }

        this.ProfileService = new ProfileService()
        //  this.FilesService = new FilesService()    // CLOUDINARYCONFIG 
        // TODO
    }

    componentDidMount = () => {
        const user_id = this.props.match.params.user_id

        this.state.editing && this.updateUser(user_id)

    }

    updateUser = user_id => {

        this.ProfileService
            .getDataUser(user_id)
            .then(response => {
                this.setState({

                    username: response.data.username,
                    role: response.data.role,
                   // image_url: response.data.image_url,//////////////////////////////////Ver
                    email: response.data.email,
                    skill: response.data.skill,
                    editing: false,
                })
            })

            .catch(err => console.log(err))
    }

     // CLOUDINARYCONFIG  
    //  handleFileUpload = e => {
    //     const uploadData = new FormData()
    //     uploadData.append("image_url", e.target.files[0])

    //     this.filesService.handleUpload(uploadData)
    //         .then(response => {
    //             console.log('Subida de archivo finalizada! La URL de Cloudinray es: ', response.data.secure_url)
    //             this.setState({ image_url: response.data.secure_url })
    //         })
    //         .catch(err => console.log(err))
    // }
    // TODO


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }
    handleFormSubmit = e => {
        e.preventDefault()
        this.ProfileService
            .editUser(this.props.match.params.user_id, {
                username: this.state.username,
                role: this.state.role,
                email: this.state.email,
                skill: this.state.skill,

            })
            .then(res => this.props.history.push(`/profile/${this.props.match.params.user_id}`))
            .catch(err => console.log(err))
    }
    checkLanguage = language => this.state.skill.includes(language)

    handleChecks = (e) => {
        let languagesCopy = [...this.state.skill]
        if (e.target.checked) {
            languagesCopy.push(e.target.value)
            this.setState({ skill: languagesCopy })
        } else {
            let updatedLanguages = languagesCopy.filter((skill) => skill !== e.target.value)
            this.setState({ skill: updatedLanguages })
        }
    }

    render() {
        

        return (
            this.state.editing ? <Spinner /> :
                <Container>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                        </Form.Group>
                          {/* // CLOUDINARYCONFIG   */}
                     <Form.Group>
                        <Form.Label>Imagen (archivo)</Form.Label>
                        <Form.Control name="image_url" type="file" onChange={this.handleFileUpload} />
                    </Form.Group>
                 
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={this.handleInputChange} value={this.state.email} name="email" type="email" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check onChange={this.handleChecks} checked={this.checkLanguage('javascript')} value='javascript' inline label="javascript" name="skill" type='checkbox' />
                            <Form.Check onChange={this.handleChecks} checked={this.checkLanguage('java')} value='java' inline label="java" name="skill" type='checkbox' />
                            <Form.Check onChange={this.handleChecks} checked={this.checkLanguage('react')} value='react' inline label="react" name="skill" type='checkbox' />
                            <Form.Check onChange={this.handleChecks} checked={this.checkLanguage('mongodb')} value='mongodb' inline label="mongodb" name="skill" type='checkbox' />
                            <Form.Check onChange={this.handleChecks} checked={this.checkLanguage('python')} value='python' inline label="python" name="skill" type='checkbox' />
                        </Form.Group>
                        <Button onClick={this.props.history.goBack} variant="dark" type="submit">Submit</Button>
                    </Form>


                </Container>
        )
    }
}

export default EditForm
import React from 'react'

const PostArticle = (props) => {
    return (<form className="postArticleForm" onSubmit={props.submitForm}>
                <label>Title</label>
                <input label="title" onChange={props.changeTitle}></input>
                <label>Body</label>
                <input label="body" onChange={props.changeBody}></input>
                <label>Select Topic</label>
                <select defaultValue="topic" onChange={props.changeTopic}>
                    <option value="topic" disabled="diabled">Select Topic</option>
                    {props.topics.map(topic => {
                    return (<option key={topic.slug} value={topic.slug}>{topic.slug}</option>)
                    })}
                </select>
            <button className="submitArticle">Submit</button>
            </form>)
}

export default PostArticle;
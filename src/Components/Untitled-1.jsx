{
    /* <form onSubmit={handleSubmit}>
                <h1>{exam.name}</h1>
                <h2>{exam.questions.length} Questions</h2>
                {exam.questions.map((question, index) => {
                    return (
                        <div key={index}>
                            <h3>{question.question} ? </h3>
                            {question.options.map((option, index) => {
                                return (
                                    <div key={index}>
                                        <input
                                            type='radio'
                                            name={question._id}
                                            value={option}
                                            onChange={(e) => {
                                                setChecked({
                                                    ...checked,
                                                    [question._id]: option,
                                                });
                                            }}
                                        />
                                        {option}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
                <button>Submit</button>
            </form> */
}
{
    /* <div class="container mt-5">
        <div class="d-flex justify-content-center row">
            <div class="col-md-10 col-lg-10">
                <div class="border">
                    <div class="question bg-white p-3 border-bottom">
                        <div class="d-flex flex-row justify-content-between align-items-center mcq">
                            <h4>MCQ Quiz</h4><span>(5 of 20)</span></div>
                    </div>
                    <div class="question bg-white p-3 border-bottom">
                        <div class="d-flex flex-row align-items-center question-title">
                            <h3 class="text-danger">Q.</h3>
                            <h5 class="mt-1 ml-2">Which of the following country has largest population?</h5>
                        </div><div class="ans ml-2">
<label class="radio"> <input type="radio" name="brazil" value="brazil"> <span>Brazil</span>
</label>    
</div><div class="ans ml-2">
<label class="radio"> <input type="radio" name="Germany" value="Germany"> <span>Germany</span>
</label>    
</div><div class="ans ml-2">
<label class="radio"> <input type="radio" name="Indonesia" value="Indonesia"> <span>Indonesia</span>
</label>    
</div><div class="ans ml-2">
<label class="radio"> <input type="radio" name="Russia" value="Russia"> <span>Russia</span>
</label>    
</div></div>
                    <div class="d-flex flex-row justify-content-between align-items-center p-3 bg-white"><button class="btn btn-primary d-flex align-items-center btn-danger" type="button"><i class="fa fa-angle-left mt-1 mr-1"></i>&nbsp;previous</button><button class="btn btn-primary border-success align-items-center btn-success" type="button">Next<i class="fa fa-angle-right ml-2"></i></button></div>
                </div>
            </div>
        </div>
    </div> */
}
// </div>

import React from 'react';

const Untitled1 = () => {
    return (
        <div>
            <div class='container mt-5'>
                <div class='d-flex justify-content-center row'>
                    <div class='col-md-10 col-lg-10'>
                        <div class='border'>
                            <div class='question bg-white p-3 border-bottom'>
                                <div class='d-flex flex-row justify-content-between align-items-center mcq'>
                                    <h4>MCQ Quiz</h4>
                                    <span>(5 of 20)</span>
                                </div>
                            </div>
                            <div class='question bg-white p-3 border-bottom'>
                                <div class='d-flex flex-row align-items-center question-title'>
                                    <h3 class='text-danger'>Q.</h3>
                                    <h5 class='mt-1 ml-2'>
                                        Which of the following country has
                                        largest population?
                                    </h5>
                                </div>
                                <div class='ans ml-2'>
                                    <label class='radio'>
                                        {' '}
                                        <input
                                            type='radio'
                                            name='brazil'
                                            value='brazil'
                                        />{' '}
                                        <span>Brazil</span>
                                    </label>
                                </div>
                            </div>
                            <div class='d-flex flex-row justify-content-between align-items-center p-3 bg-white'>
                                <button
                                    class='btn btn-primary d-flex align-items-center btn-danger'
                                    type='button'>
                                    <i class='fa fa-angle-left mt-1 mr-1'></i>
                                    &nbsp;previous
                                </button>
                                <button
                                    class='btn btn-primary border-success align-items-center btn-success'
                                    type='button'>
                                    Next<i class='fa fa-angle-right ml-2'></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Untitled - 1;


exports.postMemo = async function (req, res) {
    if(!(  req.body && req.body.content)) {
        res.redirect('/');
    }
    console.log(req.body);
    let session = req.session.user;
    let user = await User.findOne({username: session}),
        tag = req.body.tag,
        isPublic = !!(req.body.public) || false,
        content = req.body.content,
        name = req.body.name || 'undefined';


    if(user) {
        let memo = new Memo({
            userID: user._id,
            tagID: tag,
            name: name,
            content: content,
            isPublic: isPublic
        })
        let check = await memo.save();
        console.log(check);
        res.redirect('/')
    } else {
        res.redirect('/signin');
    }
};

exports.Mymemo = async function (req, res) {
    if(!(req.session && req.session.user)){
       res.redirect('/signin');
    }

    let user = await User.findOne({username: req.session.user});
    if(!user) res.redirect('/');

    let post = await Memo.find({userID: user._id});

    // console.log(_post);
    let tagMap = new Map();
    let tag = await Tag.find({});
    tag = tag.map((t) => {
        tagMap.set(t.tagID, t.name);
        return {
            id: t.tagID,
            name: t.name
        }

    });
    post = post.map((t) => {
        return {
            id: t._id,
            tag: t.tagID.map(tag => {
                return tagMap.get(tag);
            }),
            content: t.content,
            name: t.name,
            time: t.created_at
        }
    })

    res.render('index', { title: 'My memo',user: user, memo: post, tag: tag});
};

exports.Search = async function (req, res) {

    let user = await User.findOne({username :req.session.user}) || {};


    let tagMap = new Map();
    let tag = await Tag.find({});
    tag = tag.map((t) => {
        tagMap.set(t.tagID, t.name);
        return {
            id: t.tagID,
            name: t.name
        }

    });
    let text = req.query.keyword || '',
        key = await Tag.findOne({name: text});
    // let post = await Memo.find({tagID: {$elemMatch: {$eq: key.tagID}}});
    let post;

        post = await Memo.find({ $or: [
                {$and: [
                        {tagID: {$elemMatch: {$eq: key.tagID}}},
                        {userID: user._id}
                    ]},
                {$and: [
                        {tagID: {$elemMatch: {$eq: key.tagID}}},
                        {isPublic: true}
                    ]}
            ]});



    post = post.map((t) => {
        return {
            id: t._id,
            tag: t.tagID.map(tag => {
                return tagMap.get(tag);
            }),
            content: t.content,
            name: t.name,
            time: t.created_at
        }
    })
    console.log(post);
    res.render('index', {user: user, memo: post, tag: tag});
};

exports.AddMemo = async function (req, res) {
    let user;

    let tagMap = new Map();
    let tag = await Tag.find({});
    tag = tag.map((t) => {
        tagMap.set(t.tagID, t.name);
        return {
            id: t.tagID,
            name: t.name
        }

    });
    if(req.session && req.session.user){
        user = await User.findOne({username :req.session.user});
        res.render('addmemo', { title: 'Welcom',user: user, tag: tag});
    } else {
        res.redirect('/');
    }

};

exports.Clone = async function (req, res) {
    console.log(req.body);
    if(!(req.session && req.session.user)) {
        res.redirect('/signin');
    }

    if(!(req.body && req.body.id)) {
        res.redirect('/');
    }

    let _id = req.body.id;
    let memo = await Memo.findOne({_id: _id });
    if(!memo) {
        res.redirect('/');
    }
    let user = await User.findOne({username: req.session.user});
    if(user._id == memo.userID) res.redirect('/');
    let newmemo = new Memo({
        userID: user._id,
        tagID: memo.tagID,
        name: memo.name,
        content: memo.content,
        isPublic: false
    })
    let check = await newmemo.save();
    // console.log(check);
    res.redirect('/mymemo')
};

exports.Details = async function (req, res) {

};

exports.Delete = async function (req, res) {

};

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

    let post = await Memo.find({});

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
        }
    })

    res.render('index', { title: 'My memo',user: user, memo: post, tag: tag});
};

exports.Search = async function (req, res) {
    // if(!(req.session && req.session.user)){
    //     res.redirect('/signin');
    // }
    //
    // let user = await User.findOne({username: req.session.user});
    // if(!user) res.redirect('/');

    let text = req.body.keyword || '';
    let post = await Memo.find({tagID: {$elemMatch: {$eq: 1}}});

    console.log('search',post);
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
        }
    })
    res.redirect('/');
    // res.render('index', { title: 'My memo',user: user, memo: [], tag: tag});
}
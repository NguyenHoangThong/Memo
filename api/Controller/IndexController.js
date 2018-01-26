

exports.Home =async function (req, res) {
    let user;
    let post = await Memo.find({isPublic: true});

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
        });
    if(req.session && req.session.user){
        user = await User.findOne({username :req.session.user});
    }
    console.log(post);
    res.render('index', { title: 'Welcom',user: user, memo: post, tag: tag});
}
var DropNode = require('./dropnode');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    onDropUp: function(e) {
        if (this.props.onDropUp != null)
            this.props.onDropUp(e);
    },
    onDropDown: function(e) {
        if (this.props.onDropDown != null)
            this.props.onDropDown(e);
    },
    onDropRight: function(e) {
        if (this.props.onDropRight != null)
            this.props.onDropRight(e);
    },
    render: function() {
        return (
            <div style={{position:'absolute', width:'100%', height:'100%', left:'0', top:'0'}}>
                <DropNode style={{position:'absolute', left:'0', top:'0', width:'70%', height:'50%'}} onDrop={this.onDropUp} dragInfo={this.props.dragInfo}/>
                <DropNode style={{position:'absolute', left:'0', top:'50%', width:'70%', height:'50%'}} onDrop={this.onDropDown} dragInfo={this.props.dragInfo}/>
                <DropNode style={{position:'absolute', left:'70%', top:'0', width:'30%', height:'100%'}} onDrop={this.onDropRight} dragInfo={this.props.dragInfo}/>
            </div>
        )
    }
});